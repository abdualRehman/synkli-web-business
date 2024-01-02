import { useState } from "react";
import TDjumbo from "./TDjumbo";
import TDoperations from "./TDoperations";
import TDlist from "./TDlist";
import NoDirectory from "./NoDirectory";
import "./css/telephonicdirectories.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoader } from "store/global/globalReducer";
import { getAllTelephonicDirectoriesThunk } from "store/workspace/workspaceTelephonicDirectories";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { useSelector } from "react-redux";
import { getBranchLocationsThunk } from "store/auth/slices";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import { useThrottle } from "utills/useThrottle";

const TelephonicDirectoriesPage = ({
  toggleAddDirectory,
  showAddDirectory,
  directoryUpdated,
}) => {
  const { allPermissions } = useSelector((state) => state.global);
  const { data: loginData } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data } = useSelector((state) => state.getAllTelephonicDirectories);

  const [searchValue, setSearchValue] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [page, setPage] = useState(1);
  // const throttledSearch = useThrottle(searchAPI, 500);

  function searchByItem(value) {
    console.log({ value });
    setSearchValue(value);
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
    getAllTelephonicDirectories({
      business_id,
      page: newPage,
      pageSize: PAGINATION_PAGE_SIZE,
    });
  };

  const handleFilterByBranch = (value) => {
    console.log({ value });

    setBranchId(value);
  };

  const getBranchLocations = (payload) => {
    dispatch(getBranchLocationsThunk(payload))
      .then((response) => {
        if (response.payload) {
          setBranches(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const getAllTelephonicDirectories = (payload) => {
    dispatch(getAllTelephonicDirectoriesThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getAllTelephonicDirectories({
      business_id,
      page: 1,
      pageSize: PAGINATION_PAGE_SIZE,
      search_term: searchValue,
      business_branch_id: branchId,
    });
    getBranchLocations({ business_id });
  }, [dispatch, directoryUpdated, searchValue, branchId]);

  return (
    <div>
      <div>
        <TDjumbo
          showAddDirectory={showAddDirectory}
          toggleAddDirectory={toggleAddDirectory}
        />
      </div>
      <div>
        <TDoperations
          data={data}
          searchByItem={searchByItem}
          branches={branches}
          handleFilterByBranch={handleFilterByBranch}
        />
      </div>
      <div>
        {data?.rows.length < 1 ? (
          <NoDirectory />
        ) : (
          <TDlist
            filteredItems={data}
            page={page}
            pageSize={PAGINATION_PAGE_SIZE}
            count={data?.count}
            handleChangePage={handleChangePage}
            getAllTelephonicDirectories={getAllTelephonicDirectories}
          />
        )}
      </div>
    </div>
  );
};

export default TelephonicDirectoriesPage;
