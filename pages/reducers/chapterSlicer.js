
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    chapter : []
}

export const chapterSlicer = createSlice({
    name:"chapter",
    initialState,
    reducers : {
        AddChapterToCart : (state,action)=>{
            if(state.chapter[action.payload.index] === undefined){
                state.chapter.push(action.payload)
            }else{
                state.chapter[action.payload.index] = action.payload
            }
        },
        RemoveChapterFromCart : (state,action)=>{
            state.chapter = [];
        }
    }
})
export const {AddChapterToCart , RemoveChapterFromCart} = chapterSlicer.actions;
export default chapterSlicer.reducer;