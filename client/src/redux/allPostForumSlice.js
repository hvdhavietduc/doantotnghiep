import { createSlice } from '@reduxjs/toolkit';
const allPostForumSlice = createSlice({
    name: 'allPostForum',
    initialState: {
        allPost: [],
    },
    reducers: {
        deletePostByIdReducer: (state, action) => {
            state.allPost = state.allPost.filter((post) => post.id !== action.payload);
        },
        setAllPostReducer: (state, action) => {
            state.allPost = action.payload;
        },
        editPostReducer: (state, action) => {
            state.allPost = state.allPost.map((post) => {
                if (post.id === action.payload.id) {
                    post.title = action.payload.title;
                    post.content = action.payload.content;
                    post.image = action.payload.image;
                }
                return post;
            });
        },
        createPostReducer: (state, action) => {
            state.allPost = [action.payload, ...state.allPost];
        },
    },
});

export const { deletePostByIdReducer, setAllPostReducer, editPostReducer, createPostReducer } = allPostForumSlice.actions;

export default allPostForumSlice.reducer;
