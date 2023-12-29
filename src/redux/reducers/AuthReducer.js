
import { createSlice, current } from '@reduxjs/toolkit'



const initialState = {
    authStatus: false,
    user: {},
    //test:localStorage.getItem('test')
}

export const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatus: (state, action) => {
            console.log(action.payload)


        },
        setLocalStorage:(state, action)=>{
            localStorage.setItem('user',JSON.stringify(action.payload))
            setUser()
        },

        setUser: (state, action) => {
            if(state.user){
                 const user = JSON.parse(localStorage.getItem('user'))
                 state.user = user
                 state.authStatus = true
            }else{
                state.authStatus = false
            }
        },
        logoutUser:(state, action)=>{
            localStorage.removeItem("user")
            state.authStatus=false
            state.user={}
        }


    }
})



export const { login, googleLogin, register, logoutUser, setUser, setLocalStorage } = AuthReducer.actions;

export default AuthReducer.reducer;