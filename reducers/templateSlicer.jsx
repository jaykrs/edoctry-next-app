
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    template:[]
}

export const templateSlicer = createSlice({
    name: "template",
    initialState,
    reducers: {
        addTemplate : (state, action)=>{
            state.template.push(action.payload);
        }
    }
})

export const {addTemplate} = templateSlicer.actions;
export default templateSlicer.reducer;