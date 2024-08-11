import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  metadata: [],
}

export const metadataSlicer = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    AddMetadata: (state,action) => {
      state.metadata = [];
       state.metadata.push(action.payload);
    }
  },
})


export const { AddMetadata } = metadataSlicer.actions;

export default metadataSlicer.reducer;