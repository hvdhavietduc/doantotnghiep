import { createSlice } from '@reduxjs/toolkit';
const wordBooksSlice = createSlice({
    name: 'wordBooks',
    initialState: {
        listFolder: null,
        folderEachPage: 11,
    },
    reducers: {
        updateListFolder: (state, action) => {
            state.listFolder = action.payload;
        },
        addFolder: (state, action) => {
            let previousListFolder = state.listFolder;
            if (previousListFolder.length > state.folderEachPage - 1) {
                previousListFolder = previousListFolder.slice(0, state.folderEachPage - 1);
            }
            state.listFolder = [action.payload, ...previousListFolder];
        },
        clearListFolder: (state) => {
            state.listFolder = null;
        },

        updateFolder: (state, action) => {
            const newListFolder = state.listFolder.map((folder) => {
                if (folder.id === action.payload.id) {
                    folder = action.payload;
                }
                return folder;
            });
            state.listFolder = newListFolder;
        },
    },
});

export const { updateListFolder, addFolder, clearListFolder, updateFolder } = wordBooksSlice.actions;

export default wordBooksSlice.reducer;
