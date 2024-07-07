import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories : []
};

export const categoriesSlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        addCategories : (state,action)=>{
                state.categories.push(action.payload);
        },
        removeItemFromCart : (state,action)=>{
            state.cart.splice(action.payload,1)
        }
    }
})

export const {addCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;