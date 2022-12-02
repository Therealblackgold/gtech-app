import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// LEARN MORE ABOUT createEntityAdapter/ using ids to get data from entities
const noteAdapter = createEntityAdapter({
  // sorting notes by completed or open status
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});
const initialSate = noteAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      //   since using mongoDB have to set id to use createEntityAdapter
      //   so the data can be stored as ids and entities
      transformResponse: (responseData) => {
        const loadNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return noteAdapter.setAll(initialSate, loadNotes);
      },
      providesTags: (result, error, args) => {
        if (result?.ids) {
          return [
            { type: "note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "note", id })),
          ];
        } else return [{ type: "note", id: "LIST" }];
      },
    }),
    // ADD NEW NOTE
    addNewNote: builder.mutation({
      // takes note data param
      query: (initialNoteData) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNoteData,
        },
      }),
      // invalidatesTags to update the state/cache when objects below change.
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    // UPDATE NOTE
    updateNote: builder.mutation({
      // takes note data param
      query: (initialNoteData) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNoteData,
        },
      }),
      // invalidatesTags arg param to get the id and use it to invalid only the note id
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    // DELETE NOTE
    deleteNote: builder.mutation({
      // takes id object
      query: ({ id }) => ({
        url: `notes`,
        method: "DELETE",
        body: { id },
      }),
      // invalidatesTags uses arg param to get the id and use it to invalid only the note id
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

// Export endpoints
export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// create normalized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (noteResult) => noteResult.data // normalized state object with ids and entities
);

// getSelectors create these selectors and we rename the with alias
// using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = noteAdapter.getSelectors((state) => selectNotesData(state) ?? initialSate);
