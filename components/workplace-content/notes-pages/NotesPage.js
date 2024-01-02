import "./css/notes.css";
import NotesJumbo from "./NotesJumbo";
import NotesOperations from "./NotesOperations";
import NotesList from "./NotesList";
import NoNotes from "./NoNotes";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { getAllNotes, getAllNotesThunk } from "store/workspace/workspaceNotes";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { filterDataByDate } from "utills/moment";
const NotesPage = ({ toggleAddNote, notesUpdated, toggleNotesUpdate }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data } = useSelector((state) => state.getAllNotes);
  const [filterDate, setFilterDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    console.log("page change", "0909");
    // getAllTelephonicDirectories({
    //   business_id,
    //   page: newPage,
    //   pageSize: PAGINATION_PAGE_SIZE,
    // });
  };
  const [searchTerm, setSearchTerm] = useState("");

  const searchByTitle = (term) => {
    setSearchTerm(term);
    const filteredNotes = data?.filter((note) =>
      note.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setFilteredData(filteredNotes);
  };

  const filterByDate = (date) => {
    setFilterDate(date);
    setFilteredData(filterDataByDate(data, date));
    console.log(filterDataByDate(data, date));
  };
  useEffect(() => {
    const payload = {
      business_id,
    };
    dispatch(setLoader(true));
    dispatch(getAllNotesThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [dispatch, notesUpdated]);

  return (
    <div>
      <NotesJumbo />
      <div>
        <NotesOperations
          filteredNotes={searchTerm || filterDate !== "" ? filteredData : data}
          searchByTitle={searchByTitle}
          toggleAddNote={toggleAddNote}
          filterByDate={filterByDate}
        />
      </div>
      <div>
        <NotesList
          toggleNotesUpdate={toggleNotesUpdate}
          filteredNotes={searchTerm || filterDate !== "" ? filteredData : data}
        />
      </div>
    </div>
  );
};
export default NotesPage;
