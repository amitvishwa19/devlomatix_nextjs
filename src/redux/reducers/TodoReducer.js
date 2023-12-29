import { createSlice ,nanoid} from '@reduxjs/toolkit'

const initialState = {
    todosData: []
}

const TodoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload
            }
            state.todosData.push(todo)
        },
        removeTodo:(state,action)=>{
            state.todosData = state.todosData.filter((todo)=>todo.id !== action.payload.id)
        }

    }
})

export const {addTodo, removeTodo} = TodoSlice.actions;

export default TodoSlice.reducer;


