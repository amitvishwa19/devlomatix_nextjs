import { createSlice } from '@reduxjs/toolkit'


const LoaderSlice = createSlice({

    name:'loader',
    initialState:{
        loading:false
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=true;
        },
        hideLoading:(state)=>{
            state.loading=false
        }
    }
})

export const {showLoading, hideLoading} = LoaderSlice.actions;

export default LoaderSlice.reducer