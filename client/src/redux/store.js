import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wordBooksReducer from './wordBooksSlice';
import translationReducer from './translationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        wordBooks: wordBooksReducer,
        translate: translationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
