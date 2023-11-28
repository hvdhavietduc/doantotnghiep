import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        inforVerify: null,
    },
    reducers: {
        deleteInforVerify: (state) => {
            state.inforVerify = null;
        },
        addInforVerify: (state, action) => {
            state.inforVerify = action.payload;
        },
    },
});

export const { deleteInforVerify, addInforVerify, addUser } = userSlice.actions;

export default userSlice.reducer;
