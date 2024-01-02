import DatePickerComponent from "global-components/DatePicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { getAllNewsThunk } from "store/workspace/workspaceNews";
import { BUSINESS_ID } from "utills/globalVars";
import { filterDataByDate } from "utills/moment";
import { SearchIcon } from "utills/svgs/SearchIcon";
import AnnouncementJumbo from "./AnnouncementJumbo";
import AnnouncementList from "./AnnouncementList";
import "./css/announcement.css";
const AnnouncementContent = ({
  toggleAnnDetails,
  handleAnn,
  toggleAddAnn,
  annUpdated: updatedAnn,
}) => {
  const [filterDate, setFilterDate] = useState("");
  const { data } = useSelector((state) => state.getAllNews);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [annUpdated, setAnnUpdated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterEnable, setFilterEnable] = useState("");
  const [searchText, setSearchText] = useState("");
  const toggleAnnUpdate = () => {
    setAnnUpdated(!annUpdated);
  };

  const onSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);

    const filteredData = data?.filter((item) => {
      let description = item.description.toLowerCase();
      let createdBy = item.created_by.toLowerCase();
      let title = item.title.toLowerCase();
      if (
        description.trim().startsWith(value.toLowerCase()) ||
        createdBy.trim().startsWith(value.toLowerCase()) ||
        title.trim().startsWith(value.toLowerCase())
      ) {
        return item;
      }
    });
    if (filteredData.length > 0) {
      setFilteredData(filteredData);
      setFilterEnable(true);
      return;
    }
    setFilteredData([]);
    setFilterEnable(false);
  };

  const pushDate = (date) => {
    setFilterDate(date);
    setFilterEnable(true);
    setFilteredData(filterDataByDate(data, date));
  };

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getAllNewsThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [dispatch, annUpdated, updatedAnn]);

  return (
    <div>
      <AnnouncementJumbo toggleAddAnn={toggleAddAnn} />
      {data?.length > 0 && (
        <div className="flex items-center justify-between  mx-5 flex-wrap gap-2">
          <div className="search-input-container ">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input
              value={searchText}
              onChange={(e) => onSearch(e)}
              type="text"
              placeholder="Search"
              className="td-search-input"
            />
          </div>

          <div className="flex gap-2 items-center">
            {filterDate && (
              <div
                onClick={() => {
                  setFilterDate("");
                  setFilterEnable("");
                }}
                className="td-generic flex justify-center items-center"
              >
                <button className="px-10 py-2 rounded-md">Clear</button>
              </div>
            )}

            <DatePickerComponent
              type="date"
              isOpen={isOpen}
              date={filterDate}
              setVisible={(value) => setIsOpen(value)}
              onDateChange={(date) => {
                setIsOpen(false);
                pushDate(date);
              }}
            />
          </div>
        </div>
      )}

      <div>
        <AnnouncementList
          toggleAnnDetails={toggleAnnDetails}
          handleAnn={handleAnn}
          toggleAnnUpdate={toggleAnnUpdate}
          filterDate={filterDate}
          data={filterEnable !== "" ? filteredData : data}
        />
      </div>
    </div>
  );
};

export default AnnouncementContent;
