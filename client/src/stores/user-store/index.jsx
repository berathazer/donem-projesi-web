import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	user: {
		isAuthenticated: false,
	},
};

export const { reducer, actions } = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.user = { isAuthenticated: true, ...action.payload };
		},
		logoutUser: (state, action) => {
			state.user = { isAuthenticated: false };
		},
	},
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
