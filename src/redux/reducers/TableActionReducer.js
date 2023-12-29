import { createSlice } from '@reduxjs/toolkit'


const TableActionSlice = createSlice({

    name:'tableaction',
    initialState:{
        viewModal:false,
        editModal:false,
        deleteModal:false,
        data:{}
    },
    reducers:{
        openView:(state,action)=>{
            state.viewModal=true;
            state.data = action.payload
        },
        closeView:(state)=>{
            state.viewModal=false
            state.data = {}
        },
        openEdit:(state)=>{
            state.editModal=true;
            state.data = action.payload
        },
        closeEdit:(state)=>{
            state.editModal=false
            state.data = {}
        },
        openDelete:(state)=>{
            state.editModal=true;
            state.data = action.payload
        },
        closeDelete:(state)=>{
            state.editModal=false
            state.data = {}
        },
        
    }
})

export const {openView, closeView, openEdit, closeEdit, openDelete, closeDelete} = TableActionSlice.actions;

export default TableActionSlice.reducer