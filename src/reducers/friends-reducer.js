import {friendsAPI} from "../api/api"

const SET_FRIENDS = "profile/SET_FRIENDS"
const SET_FRIENDS_CANDIDATES = "profile/SET_FRIENDS_CANDIDATES"

let initialState = {
    friendsList: null,
    friendsCandidates: null
}

export const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friendsList: action.friendsList
            }
        case SET_FRIENDS_CANDIDATES:
            return {
                ...state,
                friendsCandidates: action.friendsCandidates
            }
        default:
            return state
    }
}

export const setFriendsList = (friendsList) => ({type: SET_FRIENDS, friendsList})
export const setCandidatesList = (friendsCandidates) => ({type: SET_FRIENDS_CANDIDATES, friendsCandidates})

export const getFriends = (userId) => async (dispatch) => {
    let response = await friendsAPI.getFriends(userId)
    if (response.status === 200) {
        dispatch(setFriendsList(response.data))
    } else {
        return response.data.message
    }
}

export const getFriendsCandidates = (userId) => async (dispatch) => {
    let response = await friendsAPI.getFriendsCandidates(userId)
    if (response.status === 200) {
        dispatch(setCandidatesList(response.data))
    } else {
        return response.data.message
    }
}

export const addFriend = (friendId, userId) => async (dispatch) => {
    let response = await friendsAPI.addFriend(friendId, userId)
    if (response.status === 200) {
        dispatch(getFriends(userId))
    } else {
        return response.data.message
    }
}

export const addFriendCandidate = (friendId, userId) => async (dispatch) => {
    let response = await friendsAPI.addFriendCandidate(friendId, userId)
    if (response.status === 200) {
        dispatch(getFriendsCandidates(userId))
    } else {
        return response.data.message
    }
}

export const deleteFriend = (friendId, userId) => async (dispatch) => {
    let response = await friendsAPI.deleteFriend(friendId, userId)
    if (response.status === 200) {
        dispatch(getFriends(userId))
    } else {
        return response.data.message
    }
}

export const deleteFriendsCandidate = (friendId, userId) => async (dispatch) => {
    let response = await friendsAPI.deleteFriendsCandidate(friendId, userId)
    if (response.status === 200) {
        dispatch(getFriendsCandidates(userId))
    } else {
        return response.data.message
    }
}

export default friendsReducer;
