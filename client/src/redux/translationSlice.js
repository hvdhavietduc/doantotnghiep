import { createSlice } from '@reduxjs/toolkit';
const translationSlice = createSlice({
    name: 'translation',
    initialState: {
        inputLanguage: { title: 'English', code: 'en' },
        ouputLanguage: { title: 'Vietnamese', code: 'vi' },
    },
    reducers: {
        updateInputLanguage: (state, action) => {
            state.inputLanguage = action.payload;
        },
        updateOutputLanguage: (state, action) => {
            state.ouputLanguage = action.payload;
        },
    },
});

export const { updateInputLanguage, updateOutputLanguage } = translationSlice.actions;

export default translationSlice.reducer;
