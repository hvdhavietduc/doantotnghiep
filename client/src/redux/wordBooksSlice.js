import { createSlice } from '@reduxjs/toolkit';
const wordBooksSlice = createSlice({
    name: 'wordBooks',
    initialState: {
        listFolder: null,
    },
    reducers: {
        updateListFolder: (state, action) => {
            state.listFolder = action.payload;
        },
        addFolder: (state, action) => {
            const previousListFolder = state.listFolder;
            state.listFolder = [action.payload, ...previousListFolder];
        },
        clearListFolder: (state) => {
            state.listFolder = null;
        },
    },
});

export const { updateListFolder, addFolder, clearListFolder } = wordBooksSlice.actions;

export default wordBooksSlice.reducer;
