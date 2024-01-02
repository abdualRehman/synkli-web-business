import "./css/appusers.css";
import AppUsersJumbo from "./AppUsersJumbo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { fetchBusinessCustomerThunk } from "store/client";

import { SearchIcon } from "../../utills/svgs/SearchIcon";
import { DimmedDot } from "../../utills/svgs/DimmedDot";
import { Loader } from "components/common/Loader";
import { NoDataFound } from "components/common/NoDataFound";
import { PickDate } from "utills/svgs/PickDate";
import { DimArrowDown } from "utills/svgs/DimArrowDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SortIcon } from "utills/svgs/SortIcon";
import { StepDownIcon } from "utills/svgs/StepDownIcon";
import { SortModal } from "./SortModal";
import moment from "moment";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import Pagination from "components/pagination";
import DatePickerComponent from "global-components/DatePicker";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { BUSINESS_ID } from "utills/globalVars";

const AppUsersDash = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const { data } = useSelector((state) => state.fetchBusinessCustomer);
  const [searchValue, setSearchValue] = useState("");
  const [showSortModal, setShowSortModal] = useState(false);
  const [page, setPage] = useState(1);
  const [isOpendate, setIsOpendate] = useState(false);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const handleChangePage = (newPage) => {
    setPage(newPage);

    const payload = {
      business_id: business_id,
      customer_type: "",
      order_by: filters.order_by,
      search_term: filters.search_term,
      from_date: filters.from_date,
      page: newPage,
    };

    dispatch(fetchBusinessCustomerThunk(payload))
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });

    console.log("page change", "0909");
    // getAllTelephonicDirectories({
    //   business_id,
    //   page: newPage,
    //   pageSize: PAGINATION_PAGE_SIZE,
    // });
  };
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [filters, setFilters] = useState({
    search_term: "",
    order_by: "DESC",
    from_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    const formatedDate = moment(date).format("DD-MM-YYYY").toString();
    console.log(formatedDate, "0909");
    setSelectedDate(date);
    setFilters({
      ...filters,
      from_date: formatedDate,
    });
  };

  const handleSort = (sort) => {
    setFilters({
      ...filters,
      order_by: sort,
    });
  };

  useEffect(() => {
    dispatch(setLoader(true));
    const business_id = localStorage.getItem("business_id");
    const payload = {
      business_id: business_id,
      customer_type: "",
      order_by: filters.order_by,
      search_term: filters.search_term,
      from_date: filters.from_date,
      page,
    };
    dispatch(fetchBusinessCustomerThunk(payload))
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [filters.search_term, filters.from_date, filters.order_by]);

  const toggleSortModal = () => {
    setShowSortModal(!showSortModal);
  };

  return (
    <div>
      <AppUsersJumbo />
      {isLoading && <Loader />}

      <div className="flex justify-between items-center relative flex-wrap gap-5 md:mx-10 mx-5 px-3">
        <div className="search-box ">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Search"
            name="search_term"
          />
          <div className="search-wrapper">
            <SearchIcon />
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <DatePickerComponent
              style={{
                height: "20px",
              }}
              type="date"
              isOpen={isOpendate}
              date={selectedDate}
              setVisible={(value) => setIsOpendate(value)}
              onDateChange={(date) => {
                setIsOpendate(false);
                handleDateChange(date);
                console.log(date, "consoleDate");
              }}
            />
            {/* <div className="sort-users flex items-center px-2">
     
              <span className="pickDate">
                <PickDate />{" "}
              </span>
              <DatePicker
                name="start_date"
                placeholderText="start date"
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd-MM-yyyy"
                className="pl-2 datePicker w-20"
              />
              <span className="ml-3">
                <DimArrowDown />
              </span>
            </div> */}
          </div>

          <div>
            <div
              onClick={toggleSortModal}
              className="sort-users flex gap-3 items-center p-2 relative cursor-pointer"
            >
              <div>
                <SortIcon />
              </div>
              <div>Sort by</div>
              <div className="box-icon ">
                <StepDownIcon />
              </div>
              {showSortModal && (
                <div className="absolute top-full left-0 right-0 ">
                  <SortModal
                    toggleSortModal={toggleSortModal}
                    handleSort={handleSort}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="clients-wrapper-div">
        <div className="clients-table px-10 mt-5 text-black">
          <div className="grid grid-cols-4 gap-2 md:gap-5 c-table-head">
            <div className="col-span-2 flex items-center">Client</div>
            <div className="flex justify-center items-center">Phone</div>
            {/* <div className="flex items-center">Address</div> */}
            <div className="flex items-center">Date Connected</div>
          </div>
          <div className="break-line my-2"></div>

          <div className="main-clients ">
            {data ? (
              data?.data?.map((user, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/app/user/profile/${user.business_client_id}`)
                  }
                >
                  {console.log(user, "userrrrr")}
                  <div className="grid grid-cols-4 gap-2 md:gap-5 app-users-row ">
                    <div className="flex gap-2 col-span-2 items-center app-user-item">
                      <div className="col-span-1">
                        <div
                          className={`user-img-container ${
                            isOpen && "open-img"
                          }`}
                        >
                          {user.image ? (
                            <div>
                              <img
                                src={user.image}
                                alt="userimg"
                                className="image-inside"
                              />
                            </div>
                          ) : (
                            <div>
                              <div className="user-img-container">
                                <span className="flex justify-center items-center">
                                  <DefaultUserIcon />
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" ">
                        <div className="app-user-name flex items-center gap-2">
                          <div>
                            {" "}
                            {user.first_name} {user.last_name}{" "}
                          </div>
                          <div>
                            {" "}
                            {user?.user_status === "active" ? (
                              <span className="active-client">
                                &#x2022; Active
                              </span>
                            ) : (
                              <span className="inactive-client">
                                <s> Disconnected</s>
                              </span>
                            )}{" "}
                          </div>
                        </div>
                        <div className="recently-added app-user-email">
                          {user.email}
                        </div>
                        <div
                          className={`${
                            user.took_any_service ? "main-client" : "p-client"
                          }`}
                        >
                          {user.took_any_service
                            ? "Main Client"
                            : "Prospective Client"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      {user.phone_number}
                    </div>
                    {/* <div className="flex items-center text-gray-500">
                      {" "}
                      Not Available{" "}
                    </div> */}
                    <div className="flex items-center">
                      <div className="recently-added flex gap-2">
                        <div className="flex justify-center items-center">
                          {user.created_at === "Recently Added" ? (
                            <DimmedDot />
                          ) : (
                            ""
                          )}
                        </div>
                        <div> {user.created_at}</div>
                      </div>
                    </div>
                  </div>
                  <div className="break-line my-2"></div>
                </div>
              ))
            ) : (
              <NoDataFound message="No Data Found" />
            )}
          </div>
        </div>
      </div>
      {data?.data?.length < 1 && (
        <div>
          <div className="h-20 flex justify-center items-center ">
            No Users Found
          </div>
        </div>
      )}
      {data?.count > 9 && (
        <div className="md:mx-10 mx-5 px-3">
          <Pagination
            page={page}
            pageSize={PAGINATION_PAGE_SIZE}
            count={data?.count}
            rows={data?.length}
            onChangePage={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default AppUsersDash;
