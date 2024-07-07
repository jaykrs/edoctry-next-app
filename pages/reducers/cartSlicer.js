import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : []
};

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart : (state,action)=>{
                state.cart.push(action.payload);
        },
        removeItemFromCart : (state,action)=>{
            state.cart.splice(action.payload,1)
        }
    }
})

export const {addToCart , removeItemFromCart} = cartSlice.actions;

export default cartSlice.reducer;