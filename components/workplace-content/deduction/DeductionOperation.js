import { SearchIcon } from "../../../utills/svgs/SearchIcon";
const DeductionOperation = ({ searchByItem }) => {
  return (
    <div className="md:px-10 px-5">
      <div className="search-input-container d-search">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          onChange={(e) => searchByItem(e.target.value)}
          type="text"
          placeholder="Search"
          className="td-search-input"
        />
      </div>
    </div>
  );
};

export default DeductionOperation;
