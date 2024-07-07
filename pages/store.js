// pages/store.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./reducers/counterSlicer";
import cartSlicer from './reducers/cartSlicer';
import cusAnsSlicer from './reducers/cusAnsSlicer';
import chapterSlicer from './reducers/chapterSlicer';
import qsReviewSlicer from './reducers/questionTestReviewSlicer';
import CategoriesSlicer from './reducers/CategoriesSlicer';
import templateSlicer from './reducers/templateSlicer';
import courseSlicer from './reducers/courseSlicer';
import metadataSlicer from './reducers/metadataSlicer';

const isServer = typeof window === 'undefined';

const loadFromLocalStorage = () => {
  try {
    if (!isServer) {
      const serialState = localStorage.getItem('reduxToolkitData');
      if (serialState === null) return undefined;
      return JSON.parse(serialState);
    }
  } catch (e) {
    console.log('Error loading state from localStorage:', e);
  }
  return undefined;
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartSlicer,
    cusAns: cusAnsSlicer,
    chapter: chapterSlicer,
    qsReview: qsReviewSlicer,
    categories: CategoriesSlicer,
    template: templateSlicer,
    course: courseSlicer,
    metadata: metadataSlicer,
  },
  preloadedState: loadFromLocalStorage(),
});

const saveToLocalStorage = (state) => {
  try {
    if (!isServer) {
      const serialState = JSON.stringify(state);
      localStorage.setItem('reduxToolkitData', serialState);
    }
  } catch (e) {
    console.log('Error saving state to localStorage:', e);
  }
};

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
