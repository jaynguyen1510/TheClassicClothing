// src/redux/slice/userSlide.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    name: "",
    email: "",
    access_token: "",
    phone: "",
    address: "",
    avatar: "",
    isAdmin: false
};

export const userSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { _id = "", name = "", email = "", phone = "", address = "", avatar = "", access_token = "", isAdmin } = action.payload;
            state.id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.id = "";
            state.name = "";
            state.email = "";
            state.phone = "";
            state.address = "";
            state.avatar = "";
            state.access_token = "";
            state.isAdmin = false;

        },
    },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
