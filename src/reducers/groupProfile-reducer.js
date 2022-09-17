import {friendsAPI, groupsProfileAPI, profileAPI, usersAPI} from "../api/api"
import {isAuth, logout} from "./auth-reducer";

const SET_GROUP_PROFILE = "group/SET_GROUP_PROFILE"
const SET_GROUP_POSTS = "group/SET_GROUP_POSTS"
const SET_GROUP_MEMBERS = "group/SET_GROUP_MEMBERS"
const SET_GROUP_PROFILE_AVATAR = "group/SET_GROUP_PROFILE_AVATAR"

let initialState = {
    groupProfileInfo: null,
    groupPosts: []
}

export const groupProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GROUP_PROFILE:
            return {
                ...state,
                groupProfileInfo: action.groupProfileInfo
            }
        case SET_GROUP_POSTS:
            return {
                ...state,
                groupPosts: action.groupPosts
            }
        case SET_GROUP_MEMBERS:
            return {
                ...state,
                groupMembers: action.groupMembers
            }
        case SET_GROUP_PROFILE_AVATAR:
            return {
                ...state,
                groupProfileAvatar: action.groupProfileAvatar
            }
        default:
            return state
    }
}

export const setGroupProfile = (groupProfileInfo) => ({type: SET_GROUP_PROFILE, groupProfileInfo})
export const setGroupPosts = (groupPosts) => ({type: SET_GROUP_POSTS, groupPosts})
export const setGroupMembers = (groupMembers) => ({type: SET_GROUP_MEMBERS, groupMembers})
export const setGroupProfileAvatar = (groupProfileAvatar) => ({type: SET_GROUP_PROFILE_AVATAR, groupProfileAvatar})

export const getGroupProfile = (id, loggedUsername) => async (dispatch) => {
    let response = await groupsProfileAPI.getGroupProfile(id)
    console.log(response)
    if (response.status === 200) {
        dispatch(setGroupProfile(response.data))
        dispatch(getGroupPosts(id, loggedUsername))
        return {statusCode: response.status}
    } else {
        return {statusCode: response.status,
        message: response.data.message
        }
    }
}

export const getGroupPosts = (id, loggedUsername) => async (dispatch) => {
    let response = await groupsProfileAPI.getGroupPosts(id)
    response.data.forEach(post => {
        console.log(post)
        post.isLiked = false
        post.likedUsers.forEach(username => {
            console.log(username, loggedUsername)
            post.isLiked = username === loggedUsername;
        })
    })
    if (response.status === 200) {
        dispatch(setGroupPosts(response.data))
        return {statusCode: response.status}
    } else {
        return {
            statusCode: response.status,
            message: response.data.message
        }
    }
}

export const follow = (groupName, username) => async (dispatch) => {
    let response = await groupsProfileAPI.follow(groupName, username)
    if (response.status === 200) {
        dispatch(getGroupProfile(groupName))
    } else {
        return response.data.message
    }
}

export const unfollow = (groupName, username) => async (dispatch) => {
    let response = await groupsProfileAPI.unfollow(groupName, username)
    if (response.status === 200) {
        dispatch(getGroupProfile(groupName))
    } else {
        return response.data.message
    }
}

export const updateGroupProfile = (profile, oldGroupName) => async (dispatch) => {
    let data = await groupsProfileAPI.updateGroupProfile(profile, oldGroupName)
    if (data.status !== 200) {
        const response = {
            message: data.data.message,
            status: data.status
        }
        dispatch(setGroupProfile(response.data))
        dispatch(isAuth())
        return response
    } else {
        const response = {
            message: data.data.message,
            status: data.status
        }
        return response
    }
}

export const uploadGroupAvatar = (avatar, id) => async (dispatch) => {
    let data = await groupsProfileAPI.uploadGroupAvatar(avatar, id)
    if (data.status !== 200) {
        const response = {
            message: data.data.message,
            status: data.status
        }
        dispatch(getGroupProfile(id))
        return response
    } else {
        const response = {
            message: data.data.message,
            status: data.status
        }
        return response
    }
}

export const updateGroupAvatar = (croppedAvatar, id) => async (dispatch) => {
    let data = await groupsProfileAPI.updateGroupAvatar(croppedAvatar, id)
    if (data.status !== 200) {
        const response = {
            message: data.data.message,
            status: data.status
        }
        dispatch(getGroupProfile(id))
        return response
    } else {
        const response = {
            message: data.data.message,
            status: data.status
        }
        return response
    }
}

export const deleteGroupAvatar = (id) => async (dispatch) => {
    let data = await groupsProfileAPI.deleteGroupAvatar(id)
    if (data.status !== 200) {
        const response = {
            message: data.data.message,
            status: data.status
        }
        dispatch(getGroupProfile(id))
        return response
    } else {
        const response = {
            message: data.data.message,
            status: data.status
        }
        return response
    }
}

export const deleteGroup = (id) => async (dispatch) => {
    let data = await groupsProfileAPI.deleteGroup(id)
}

export default groupProfileReducer;
