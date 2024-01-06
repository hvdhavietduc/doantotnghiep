import { createSlice } from '@reduxjs/toolkit';
const wordBooksSlice = createSlice({
    name: 'wordBooks',
    initialState: {
        currentPage: 1,
    },
    reducers: {
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { updateCurrentPage } = wordBooksSlice.actions;

export default wordBooksSlice.reducer;
