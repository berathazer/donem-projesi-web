import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	user: {
        isAuthenticated:true
    },
};


export const { reducer, actions } = createSlice({
	name: "user",
	initialState,
	reducers: {},
});


/*
createSlice return olarak reducer ve actions dönüyor ondan böyle destruct yapabiliriz.

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {},
});


*/