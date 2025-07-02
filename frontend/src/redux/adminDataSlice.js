import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
    name: 'admin',
    initialState: {
        companyData: null,
        jobData: null,
    },
    reducers: {
        setCompanyData: (state, action) => {
            state.data = action.payload
        },
        setJobsData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setCompanyData, setJobsData  } = adminDataSlice.actions

export default adminDataSlice.reducer