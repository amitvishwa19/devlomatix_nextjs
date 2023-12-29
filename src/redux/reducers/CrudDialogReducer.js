import { createSlice } from '@reduxjs/toolkit'


const CrudDialogSlice = createSlice({

    name:'cruddialog',
    initialState:{
        modalOpenState:false,
        data:{},
        type:'add',
    },
    reducers:{
        openView:(state,action)=>{
            state.modalOpenState=true;
            state.data = action.payload.data;
            state.type = action.payload.type;
            //console.log(action.payload)
        },
        closeView:(state)=>{
            state.modalOpenState=false
            //state.data = {},
            state.type = 'add';
        },
    }
})

export const { openView, closeView } = CrudDialogSlice.actions;

export default CrudDialogSlice.reducer