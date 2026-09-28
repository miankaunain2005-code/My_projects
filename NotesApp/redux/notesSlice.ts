import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Note = {
    id: string;
    text: string;
};

const notesSlice = createSlice({
    name: "notes",
    initialState: [] as Note[],
    reducers: {
        addNote: (state, action: PayloadAction<string>) => {
            state.push({
                id: Date.now().toString(),
                text: action.payload,
            });
        },

        deleteNote: (state, action: PayloadAction<string>) => {
            return state.filter(note => note.id !== action.payload);
        },
    },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;