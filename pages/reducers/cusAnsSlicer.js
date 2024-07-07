import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cusAns : []
};

export const CusAnsSlicer = createSlice({
    name:"cusAns",
    initialState,
    reducers : {
        AddCusAns : (state,action)=>{
           // state.cusAns.push(action.payload)
           if(state.cusAns[action.payload.index] === undefined){
               state.cusAns.push(action.payload)
           }else{
            state.cusAns[action.payload.index] = action.payload
           }
        },
       UpdateCusAns : (state,action)=>{
          state.cusAns[action.payload.index] = action.payload.data
       },
       RemoveAllCusAns : (state,action)=>{
        state.cusAns = [];
       }
    }
})

export const {AddCusAns , UpdateCusAns, RemoveAllCusAns} = CusAnsSlicer.actions;
export default CusAnsSlicer.reducer ;