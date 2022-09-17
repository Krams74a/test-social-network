import {friendsAPI} from "../api/api"
import {getProfileFriends, getProfileIncomingRequests} from "./profile-reducer";

const SET_FRIENDS = "profile/SET_FRIENDS"
const SET_INCOMING_REQUESTS = "profile/SET_INCOMING_REQUESTS"

let initialState = {
    friendsList: null,
    incomingRequests: null
}

export const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friendsList: action.friendsList
            }
        case SET_INCOMING_REQUESTS:
            return {
                ...state,
                incomingRequests: action.incomingRequests
            }
        default:
            return state
    }
}

export const setFriendsList = (friendsList) => ({type: SET_FRIENDS, friendsList})
export const setIncomingRequests = (incomingRequests) => ({type: SET_INCOMING_REQUESTS, incomingRequests})

export const getFriends = (userId) => async (dispatch) => {
    let response = await friendsAPI.getFriends(userId)
    if (response.status === 200) {
        dispatch(setFriendsList(response.data))
    } else {
        return response.data.message
    }
}

export const getIncomingRequests = (userId) => async (dispatch) => {
    let response = await friendsAPI.getIncomingRequests(userId)
    if (response.status === 200) {
        dispatch(setIncomingRequests(response.data))
    } else {
        return response.data.message
    }
}

export const sendIncomingRequest = (friendUsername, userId) => async (dispatch) => {
    let response = await friendsAPI.sendIncomingRequest(friendUsername, userId)
    if (response.status === 200) {
        dispatch(getFriends(friendUsername))
        dispatch(getProfileIncomingRequests(friendUsername))
        dispatch(getIncomingRequests(friendUsername))
    } else {
        return response.data.message
    }
}

export const stopIncomingRequest = (friendUsername, userId) => async (dispatch) => {
    let response = await friendsAPI.stopIncomingRequest(friendUsername, userId)
    if (response.status === 200) {
        dispatch(getFriends(friendUsername))
        dispatch(getProfileFriends(friendUsername))
        dispatch(getIncomingRequests(friendUsername))
    } else {
        return response.data.message
    }
}

export const cancelIncomingRequest = (senderUsername, userId) => async (dispatch) => {
    let response = await friendsAPI.cancelIncomingRequest(senderUsername, userId)
    if (response.status === 200) {
        dispatch(getFriends(userId))
        dispatch(getProfileFriends(senderUsername))
        dispatch(getIncomingRequests(userId))
    } else {
        return response.data.message
    }
}

export const applyIncomingRequest = (senderUsername, userId) => async (dispatch) => {
    let response = await friendsAPI.applyIncomingRequest(senderUsername, userId)
    if (response.status === 200) {
        dispatch(getFriends(userId))
        dispatch(getProfileFriends(senderUsername))
        dispatch(getIncomingRequests(userId))
    } else {
        return response.data.message
    }
}

export const removeFromFriends = (friendUsername, userId) => async (dispatch) => {
    let response = await friendsAPI.removeFromFriends(friendUsername, userId)
    if (response.status === 200) {
        dispatch(getFriends(userId))
        dispatch(getProfileFriends(friendUsername))
        dispatch(getIncomingRequests(userId))
    } else {
        return response.data.message
    }
}

export default friendsReducer;
