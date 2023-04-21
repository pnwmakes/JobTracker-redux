import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    searchLocation: '',
    fullTime: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFullTime: (state, action) => {
            state.fullTime = action.payload;
        },
    },
});

export const { setSearchTerm, setFullTime } = searchSlice.actions;

export default searchSlice.reducer;
