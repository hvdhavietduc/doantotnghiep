import { createSlice } from '@reduxjs/toolkit';
const wordBooksSlice = createSlice({
    name: 'wordBooks',
    initialState: {
        listFolder: null,
    },
    reducers: {
        initialListFolder: (state, action) => {
            state.listFolder = action.payload;
        },
        addFolder: (state, action) => {
            const previousListFolder = state.listFolder;
            state.listFolder = [...previousListFolder, action.payload];
        },
        clearListFolder: (state) => {
            state.listFolder = null;
        },
    },
});

export const { initialListFolder, addFolder, clearListFolder } = wordBooksSlice.actions;

export default wordBooksSlice.reducer;
