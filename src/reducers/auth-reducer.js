import {authAPI} from "../api/api";
import {decodeToken} from "react-jwt"

const SET_LOGGED_USER_DATA = "auth-reducer/SET_LOGINED_USER_DATA"
const SET_IS_AUTH = "auth-reducer/SET_IS_AUTH"

let initialState = {
    loggedUserInfo: {
        username: "",
        id: ""
    },
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_USER_DATA:
            return {
                ...state,
                loggedUserInfo: {
                    username: action.userData.username,
                    id: action.userData.id
                }
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.booleanValue
            }
        default:
            return state
    }
}

export const setLoggedUserData = (userData) => ({type: SET_LOGGED_USER_DATA, userData: userData})
export const setIsAuth = (booleanValue) => ({type: SET_IS_AUTH, booleanValue})

export const registration = (username, password) => async (dispatch) => {
    let data = await authAPI.registration(username, password)
    if (data.status !== 200) {
        const response = {
            message: data.data.message,
            status: data.status
        }
        return response
    } else {
        const response = {
            message: data.data.message,
            status: data.status
        }
        return response
    }
}

export const login = (username, password) => async (dispatch) => {
    let data = await authAPI.login(username, password)
    if (!data.status) {
        localStorage.setItem("token", data.token)
        const myDecodedToken = decodeToken(data.token)
        dispatch(setLoggedUserData(myDecodedToken))
        dispatch(setIsAuth(true))
    } else {
        return data.data.message
    }
}

export const isAuth = () => async (dispatch) => {
    const userToken = localStorage.getItem("token")
    if (userToken) {
        const myDecodedToken = decodeToken(userToken)
        dispatch(setLoggedUserData(myDecodedToken))
        dispatch(setIsAuth(true))
    } else {
        dispatch(setLoggedUserData({username:"", id:""}))
        dispatch(setIsAuth(false))
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("token")
    dispatch(setLoggedUserData({}))
    dispatch(setIsAuth(false))
}

export default authReducer;
