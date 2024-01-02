import { methods } from "apiEndpoints";
import generateThunkAndSlice from "store/thunk/thunk";
import { endpoint } from "apiEndpoints";

const { slice: getAllNotes, request: getAllNotesThunk } = generateThunkAndSlice(
  "getAllNotes",
  endpoint.getAllNotes,
  methods.POST
);

const { slice: createNote, request: createNoteThunk } = generateThunkAndSlice(
  "createNote",
  endpoint.createNote,
  methods.POST
);

const { slice: uploadNoteFile, request: uploadNoteFileThunk } =
  generateThunkAndSlice(
    "uploadNoteFile",
    endpoint.uploadNoteFile,
    methods.POST
  );

  const {slice : deleteNote, request : deleteNoteThunk} = generateThunkAndSlice(
    "deleteNote",
    endpoint.deleteNote,
    methods.POST
  )

export { getAllNotes, getAllNotesThunk, createNoteThunk, uploadNoteFileThunk, deleteNoteThunk};
