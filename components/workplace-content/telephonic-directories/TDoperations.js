import { useState } from "react";
import { SearchIcon } from "../../../utills/svgs/SearchIcon";
const TDoperations = ({
  handleFilterByBranch,
  searchByItem,
  branches,
  data,
}) => {
  const [search_term, set_search_term] = useState("");
  const [branch, setBranch] = useState("");

  const handleInputChange = (e, type) => {
    console.log({ e: e.target.value });
    if (type === "search") {
      searchByItem(e.target.value);
      set_search_term(e.target.value);
    } else {
      handleFilterByBranch(e.target.value);
      setBranch(e.target.value);
    }
  };
  console.log({ branch });
  const resetFilter = () => {
    set_search_term("");
    setBranch("");
    handleFilterByBranch("");
    searchByItem("");
  };

  return (
    <div className="md:px-10 px-5 ">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="search-input-container">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input
              value={search_term}
              onChange={(e) => handleInputChange(e, "search")}
              type="text"
              placeholder="Search"
              className="td-search-input"
            />
          </div>
        </div>
        <div className="flex md:justify-end gap-3 items-center">
          <div className="td-select">
            <select
              value={branch}
              onChange={(e) => {
                handleInputChange(e, "branch");
              }}
            >
              <option value="" selected>
                Filter By Branch
              </option>
              {branches &&
                branches?.map((branch, index) => (
                  <option value={branch?.business_branch_id}>
                    {branch.title}
                  </option>
                ))}
            </select>
          </div>
          {branch && (
            <div
              onClick={resetFilter}
              className="td-generic flex justify-center items-center"
            >
              <button className="px-10 py-2 rounded-md">Reset</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TDoperations;
