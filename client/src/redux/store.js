import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wordBooksReducer from './wordBooksSlice';
import translationReducer from './translationSlice';
import myPostReducer from './myPostSlice';
import allPostForumReducer from './allPostForumSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        wordBooks: wordBooksReducer,
        translate: translationReducer,
        myPost: myPostReducer,
        comunityPost: allPostForumReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
