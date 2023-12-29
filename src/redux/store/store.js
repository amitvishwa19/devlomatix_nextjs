import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../reducers/AuthReducer';
import TodoReducer from '../reducers/TodoReducer';
import LoaderReducer from '../reducers/LoaderReducer';
import TableActionReducer from '../reducers/TableActionReducer';
import CrudDialogReducer from '../reducers/CrudDialogReducer';
import TaskmanReducer from '../reducers/TaskmanReducer';


const store = configureStore({
    reducer: {
        auth:AuthReducer,
        //todos:TodoReducer,
        loader: LoaderReducer,
        tableaction: TableActionReducer,
        cruddialog: CrudDialogReducer,
        taskman : TaskmanReducer
    }
      
     
})

export default store;



