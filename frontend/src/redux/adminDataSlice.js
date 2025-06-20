import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setData } = adminDataSlice.actions

export default adminDataSlice.reducer