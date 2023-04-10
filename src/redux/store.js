import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';
import searchReducer from './searchSlice';

const store = configureStore({
    reducer: {
        jobs: jobReducer,
        search: searchReducer,
    },
});

export default store;
