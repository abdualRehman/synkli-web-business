import DeductionJumbo from "./DeductionJumbo";
import { useState, useEffect } from "react";
import DeductionList from "./DeductionList";
import DeductionOperation from "./DeductionOperation";
import NoDeduction from "./NoDeduction";
import "./css/deduction.css";
import { getAllDeductionsThunk } from "store/workspace/workspaceDeduction";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { useSelector } from "react-redux";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import { useDispatch } from "react-redux";
import { setLoader } from "store/global/globalReducer";

const DeductionPage = ({ toggleAddDeduction, deductionUpdated }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data } = useSelector((state) => state.getAllDeductions);

  const [searchTerm, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  function searchByItem(value) {
    setSearchValue(value);
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
    getAllDeductions({
      business_id,
      page: newPage,
      pageSize: PAGINATION_PAGE_SIZE,
    });
  };

  const filteredDeductions = data?.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllDeductions = (payload) => {
    dispatch(setLoader(true));
    dispatch(getAllDeductionsThunk(payload))
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
    getAllDeductions({
      business_id,
    });
  }, [dispatch, deductionUpdated]);

  return (
    <div>
      <DeductionJumbo toggleAddDeduction={toggleAddDeduction} />

      <div>
        <DeductionOperation searchByItem={searchByItem} />
      </div>
      <div>
        {!filteredDeductions?.length ? (
          <NoDeduction />
        ) : (
          <DeductionList
            filteredDeductions={filteredDeductions}
            getAllDeductions={getAllDeductions}
          />
        )}
      </div>
    </div>
  );
};

export default DeductionPage;
