import {authAPI, friendsAPI, postsAPI, profileAPI, usersAPI} from "../api/api";
import {decodeToken} from "react-jwt"
import {setProfile, setProfileGroupsList} from "./profile-reducer";
import {setFriendsList, setIncomingRequests} from "./friends-reducer";
import {getPosts} from "./posts-reducer";

const SET_LOGGED_USER_DATA = "auth-reducer/SET_LOGGED_USER_DATA"
const SET_LOGGED_USER_PROFILE = "auth-reducer/SET_LOGGED_USER_PROFILE"
const SET_LOGGED_USER_FRIENDS_LIST = "auth-reducer/SET_LOGGED_USER_FRIENDS_LIST"
const SET_LOGGED_USER_GROUPS_LIST = "auth-reducer/SET_LOGGED_USER_GROUPS_LIST"
const SET_LOGGED_USER_INCOMING_REQUESTS = "auth-reducer/SET_LOGGED_USER_INCOMING_REQUESTS"
const SET_LOGGED_USER_POSTS = "auth-reducer/SET_LOGGED_USER_POSTS"
const SET_IS_AUTH = "auth-reducer/SET_IS_AUTH"

let initialState = {
    loggedUserInfo: {
        username: "",
        id: ""
    },
    loggedUserProfile: {},
    loggedUserFriendsList: [],
    loggedUserGroupsList: [],
    loggedUserIncomingRequests: [],
    loggedUserPosts: [],
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_USER_DATA:
            return {
                ...state,
                loggedUserInfo: {
                    username: action.userData.username,
                    id: action.userData.id,
                }
            }
        case SET_LOGGED_USER_PROFILE:
            return {
                ...state,
                loggedUserProfile: action.loggedUserProfile
            }
        case SET_LOGGED_USER_FRIENDS_LIST:
            return {
                ...state,
                loggedUserFriendsList: action.loggedUserFriendsList
            }
        case SET_LOGGED_USER_GROUPS_LIST:
            return {
                ...state,
                loggedUserGroupsList: action.loggedUserGroupsList
            }
        case SET_LOGGED_USER_INCOMING_REQUESTS:
            return {
                ...state,
                loggedUserIncomingRequests: action.loggedUserIncomingRequests
            }
        case SET_LOGGED_USER_POSTS:
            return {
                ...state,
                loggedUserPosts: action.loggedUserPosts
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
export const setLoggedUserProfile = (loggedUserProfile) => ({type: SET_LOGGED_USER_PROFILE, loggedUserProfile})
export const setLoggedUserFriendsList = (loggedUserFriendsList) => ({type: SET_LOGGED_USER_FRIENDS_LIST, loggedUserFriendsList})
export const setLoggedUserGroupsList = (loggedUserGroupsList) => ({type: SET_LOGGED_USER_GROUPS_LIST, loggedUserGroupsList})
export const setLoggedUserIncomingRequests = (loggedUserIncomingRequests) => ({type: SET_LOGGED_USER_INCOMING_REQUESTS, loggedUserIncomingRequests})
export const setLoggedUserPosts = (loggedUserPosts) => ({type: SET_LOGGED_USER_POSTS, loggedUserPosts})
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

export const getLoggedUser = (loggedUsername) => async (dispatch) => {
    dispatch(getLoggedUserProfile(loggedUsername))
    dispatch(getLoggedUserFriends(loggedUsername))
    dispatch(getLoggedUserGroupsList(loggedUsername))
    dispatch(getLoggedUserIncomingRequests(loggedUsername))
    dispatch(getLoggedUserPosts(loggedUsername))
}

export const getLoggedUserProfile = (loggedUsername) => async (dispatch) => {
    let response = await profileAPI.getProfile(loggedUsername)
    if (response.status === 200) {
        dispatch(setLoggedUserProfile(response.data))
        return {statusCode: response.status}
    } else {
        return {statusCode: response.status,
            message: response.data.message}
    }
}

export const getLoggedUserFriends = (loggedUsername) => async (dispatch) => {
    let response = await friendsAPI.getFriends(loggedUsername)
    if (response.status === 200) {
        dispatch(setLoggedUserFriendsList(response.data))
    } else {
        return response.data.message
    }
}

export const getLoggedUserGroupsList = (loggedUsername) => async (dispatch) => {
    let data = await usersAPI.getUserGroupsList(loggedUsername)
    dispatch(setLoggedUserGroupsList(data))
}

export const getLoggedUserIncomingRequests = (loggedUsername) => async (dispatch) => {
    let response = await friendsAPI.getIncomingRequests(loggedUsername)
    if (response.status === 200) {
        dispatch(setLoggedUserIncomingRequests(response.data))
    } else {
        return response.data.message
    }
}

export const getLoggedUserPosts = (loggedUsername) => async (dispatch) => {
    let response = await usersAPI.getProfilePosts(loggedUsername)
    if (response.status === 200) {
        response.data.forEach(post => {
            post.isLiked = false
            post.likedUsers.forEach(username => {
                post.isLiked = username === loggedUsername;
            })
        })
        dispatch(setLoggedUserPosts(response.data))
    } else {
        return response.data.message
    }
}

export const likePost = (postId, userId) => async (dispatch) => {
    let response = await postsAPI.likePost(postId, userId)
    if (response.status === 200) {
        dispatch(getLoggedUserPosts(userId))
        const messageAndStatus = {
            message: response.data.message,
            status: response.status
        }
        return messageAndStatus
    } else {
        const messageAndStatus = {
            message: response.data.message,
            status: response.status
        }
        return messageAndStatus
    }
}

export const dislikePost = (postId, userId) => async (dispatch) => {
    let response = await postsAPI.dislikePost(postId, userId)
    if (response.status === 200) {
        dispatch(getLoggedUserPosts(userId))
        const messageAndStatus = {
            message: response.data.message,
            status: response.status
        }
        return messageAndStatus
    } else {
        const messageAndStatus = {
            message: response.data.message,
            status: response.status
        }
        return messageAndStatus
    }
}

export const deletePost = (id) => async (dispatch) => {
    await postsAPI.deletePost(id)
    dispatch(isAuth())
}

export const login = (username, password) => async (dispatch) => {
    let data = await authAPI.login(username, password)
    if (!data.status) {
        localStorage.setItem("token", data.token)
        const myDecodedToken = decodeToken(data.token)
        dispatch(setLoggedUserData(myDecodedToken))
        dispatch(setIsAuth(true))
        dispatch(getLoggedUser(username))
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
        dispatch(getLoggedUser(myDecodedToken.username))
    } else {
        dispatch(setLoggedUserData({username:"", id:""}))
        dispatch(setIsAuth(false))
        dispatch(setLoggedUserProfile({}))
        dispatch(setLoggedUserFriendsList([]))
        dispatch(setLoggedUserGroupsList([]))
        dispatch(setLoggedUserIncomingRequests([]))
        dispatch(setLoggedUserPosts([]))
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("token")
    dispatch(setLoggedUserData({}))
    dispatch(setIsAuth(false))
    dispatch(setLoggedUserProfile({}))
    dispatch(setLoggedUserFriendsList([]))
    dispatch(setLoggedUserGroupsList([]))
    dispatch(setLoggedUserIncomingRequests([]))
    dispatch(setLoggedUserPosts([]))
}

export default authReducer;
