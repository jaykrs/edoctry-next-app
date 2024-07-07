import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qsReview:[]
}

 export const qsReviewSlicer = createSlice({
    initialState,
    name:"qsReview",
    reducers: {
        setQuestionReview : (state,action)=>{
            if(state.qsReview[action.payload.index] === undefined){
                state.qsReview.push(action.payload)
            }else{
                state.qsReview[action.payload.index] = action.payload
            }
            
        }
    }
})
export const {setQuestionReview} = qsReviewSlicer.actions;
export default qsReviewSlicer.reducer;