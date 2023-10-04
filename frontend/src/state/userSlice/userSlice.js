import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from './user.service';
import { toast } from 'react-toastify';

const initialState = {
    token: localStorage.token,
    name: null,
    surname: null,
    email: null
};

export const signupUser = createAsyncThunk(
    'user/signupUser',
    async ({ body, setErrors, navigate }) => {
        try {
            await UserService.signupUser(body)
            toast.success("Account successfully created")
            navigate('/login')
        }
        catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response?.data?.errors)
            }
            else {
                console.log(err.message)
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ body, setErrors }, { dispatch }) => {
        try {
            const res = await UserService.loginUser(body)
            const { token } = res.data.success
            dispatch(setToken(token))
            dispatch(getAuthorizedUser())
        }
        catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response?.data?.errors)
            }
            else {
                console.log(err)
            }
        }
    }
)

export const getAuthorizedUser = createAsyncThunk(
    'user/getUser',
    async (_, { dispatch, getState }) => {
        try {
            const { user } = getState()
            const res = await UserService.getAuthorizedUser(user.token)
            dispatch(setUserData(res.data))
        }
        catch (err) {
            dispatch(logoutUser())
            console.log(err)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem("token", action.payload)
            state.token = action.payload
        },
        setUserData: (state, action) => {
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.email = action.payload.email
        },
        logoutUser: (state) => {
            localStorage.removeItem('token')
            state.token = null
            state.name = null
            state.surname = null
            state.email = null
        }
    },
});

export const { setToken, setUserData, logoutUser } = userSlice.actions;

export default userSlice.reducer;
