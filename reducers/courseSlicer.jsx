import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  course: [],
}

export const courseSlicer = createSlice({
  name: 'course',
  initialState,
  reducers: {
    AddCourse: (state,action) => {
      state.course = [];
       state.course.push(action.payload);
    },
    removeCourse : (state,action)=>{
       state.course.length = 0;
    }
  },
})


export const { AddCourse,removeCourse } = courseSlicer.actions;

export default courseSlicer.reducer;