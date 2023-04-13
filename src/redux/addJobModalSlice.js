import { createSlice } from '@reduxjs/toolkit';

const addJobModalSlice = createSlice({
    name: 'addJobModal',
    initialState: {
        showModal: false,
        onAddJob: null,
    },
    reducers: {
        setShowModal(state, action) {
            state.showModal = action.payload;
        },
        setOnAddJob(state, action) {
            state.onAddJob = action.payload;
        },
    },
});

export const { setShowModal, setOnAddJob } = addJobModalSlice.actions;

export default addJobModalSlice.reducer;
