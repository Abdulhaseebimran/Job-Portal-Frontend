import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,
//     isLoading: false,
// };

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        user: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
})

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;