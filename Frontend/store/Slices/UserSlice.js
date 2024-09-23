import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
       state.user = {
        order: action.payload.order,
        cart: action.payload.cart,
        id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        isAdmin: action.payload.isAdmin,
      }; 
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
