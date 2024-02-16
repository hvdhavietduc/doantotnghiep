import { createSlice } from '@reduxjs/toolkit';
const wordBooksSlice = createSlice({
    name: 'wordBooks',
    initialState: {
        currentPage: 1,
        currentPageWordInFolder: 1,
        nameFolderCurrent: '',
    },
    reducers: {
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        updatecCurrentPageWordInFolder: (state, action) => {
            state.currentPageWordInFolder = action.payload;
        },
    },
});

export const { updateCurrentPage, updatecCurrentPageWordInFolder } = wordBooksSlice.actions;

export default wordBooksSlice.reducer;
