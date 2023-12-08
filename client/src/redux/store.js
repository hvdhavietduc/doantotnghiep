import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wordBooksReducer from './wordBooksSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        wordBooks: wordBooksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
