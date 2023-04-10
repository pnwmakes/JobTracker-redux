import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'Big Tech & Surf Inc.',
        location: 'San Francisco, CA',
        description: 'We are looking for a Frontend grunt intern.',
        status: 'no-answer',
        notes: [],
        appliedDate: '04/12/2023',
    },
    {
        id: 2,
        title: 'Backend Developer',
        company: 'Bagles & Loks Start Up Corp.',
        location: 'New York, NY',
        description: 'We are looking for a Backend DevOps, No experience.',
        status: 'no-answer',
        notes: [],
        appliedDate: '03/23/2023'
    },
    {
        id: 3,
        title: 'Fullstack Developer',
        company: 'Coffe and Grundge LLC.',
        location: 'Seattle, WA',
        description: 'We are looking for Fullstack type of person, No experience.',
        status: 'no-answer',
        notes: [],
        appliedDate: '04/03/2023'
    },
    {
        id: 4,
        title: 'Junior QA Software Engineer',
        company: 'We Break Stuff Inc.',
        location: 'Palo Alto, CA',
        description: 'We are looking for someone to break things.',
        status: 'no-answer',
        notes: [],
        appliedDate: '04/09/2023'
    },
];

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addJob: (state, action) => {
            state.unshift(action.payload);
        },
        deleteJob: (state, action) => {
            return state.filter((job) => job.id !== action.payload);
        },
        updateJob: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.id);
            if (index >= 0) {
                state[index] = action.payload;
            }
        },
        updateJobStatus: (state, action) => {
            const { jobId, newStatus } = action.payload;
            const index = state.findIndex((job) => job.id === jobId);
            if (index >= 0) {
                state[index].status = newStatus;
            }
        },
        addNote: (state, action) => {
            const { jobId, newNote } = action.payload;
            const index = state.findIndex((job) => job.id === jobId);
            if (index >= 0) {
                state[index].notes.push(newNote);
            }
        },
    },
});

export const { addJob, deleteJob, updateJob, updateJobStatus, addNote } = jobSlice.actions;

export default jobSlice.reducer;
