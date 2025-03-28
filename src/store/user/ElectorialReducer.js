import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentElectorial: null,
    error: null,
    loading: false,
};

const electorialSlice = createSlice({
    name: 'electorial',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.currentElectorial = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.currentElectorial = action.payload;
            state.loading = false;
            state.error = null;
        },
        signUpFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStart: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.currentElectorial = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteStart: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state) => {
            state.currentElectorial = null;  // Clear currentElectorial on delete
            state.loading = false;
            state.error = null;
        },
        deleteFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentElectorial = null;  // Reset currentElectorial on sign out
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { 
    signinStart, signinSuccess, signinFailure,
    signUpStart, signUpSuccess, signUpFailure,
    updateStart, updateSuccess, updateFailure,
    signOutUserStart, signOutUserSuccess, signOutUserFailure,
    deleteStart, deleteSuccess, deleteFailure
} = electorialSlice.actions;

export default electorialSlice.reducer;
