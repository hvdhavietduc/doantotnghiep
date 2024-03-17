import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wordBooksReducer from './wordBooksSlice';
import myPostReducer from './myPostSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        wordBooks: wordBooksReducer,
        myPost: myPostReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
