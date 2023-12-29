import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios';


const TaskmanSlice = createSlice({

    name:'taskman',
    initialState:{
        taskBoards:[],
        taskBoard:{},
        columns:[],
        pillers:[],
        loading:false,
        boardCrudModal:false,
        taskCrudModal:false,
        deleteModal:false
    },
    reducers:{
        setTaskBoards:(state,action) =>{
            state.taskBoards = action.payload
            //console.log('setTaskBoards', action.payload)
        },
        setTaskBoard:(state,action) =>{
            state.taskBoard = action.payload
            state.pillers = action.payload.pillers
            //console.log('setTaskBoard', action.payload)
        },
        addTaskBoard:(state,action) =>{
            state.taskBoards.push(action.payload)
            console.log('setTaskBoard', action.payload)
        },
        setColumns:(state, action)=>{
            state.columns = action.payload
            console.log('Set columns',action.payload)
        },
        addColumn:(state, action)=>{
            console.log('Add column', action.payload)
            state.columns.push(action.payload)
        },
        setPillers:(state, action)=>{
            state.pillers = action.payload
            console.log('Set pillers',action.payload)
        },
        addPiller:(state, action)=>{
            //console.log('Add piller', action.payload)
            state.taskBoard.pillers.push(action.payload)
        },
        removePiller:(state, action)=>{
            state.taskBoard = action.payload
            //console.log(action.payload)
        },
        addTask:(state, action)=>{
            state.taskBoard.pillers.forEach((e,i) => {
                //console.log('e._id', e._id)
                //console.log('action.payload', action.payload)
                if(e._id === action.payload.piller){
                    e.tasks.push(action.payload);
                }
            });
        },
        openBoardCrudModal:(state, action)=>{
            state.boardCrudModal = true
        },
        closeBoardCrudModal:(state, action)=>{
            state.boardCrudModal = false
        },
        openTaskCrudModal:(state, action)=>{
            state.taskCrudModal = true
        },
        closeTaskCrudModal:(state, action)=>{
            state.taskCrudModal = false
        },
        openDeleteModal:(state, action)=>{
            state.deleteModal = true
        },
        closeDeleteModal:(state, action)=>{
            state.deleteModal = false
        }
    }
})

export const {
    setTaskBoards,
    setTaskBoard,
    setColumns,
    addColumn,
    setPillers,
    addPiller,
    removePiller,
    addTaskBoard,
    addTask,
    openBoardCrudModal,
    closeBoardCrudModal,
    openTaskCrudModal,
    closeTaskCrudModal,
    deleteModal,
    closeDeleteModal
} = TaskmanSlice.actions;

export default TaskmanSlice.reducer