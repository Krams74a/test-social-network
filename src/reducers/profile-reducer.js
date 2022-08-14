import {profileAPI} from "../api/api"
import {isAuth} from "./auth-reducer";

const SET_PROFILE = "profile/SET_PROFILE"
const SET_PROFILE_AVATAR = "profile/SET_PROFILE_AVATAR"

let initialState = {
    profileInfo: null,
    profileId: "",
    profileAvatar: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profileInfo: action.profile
            }
        case SET_PROFILE_AVATAR:
            return {
                ...state,
                profileAvatar: action.profileAvatar
            }
        default:
            return state
    }
}

export const setProfile = (profile) => ({type: SET_PROFILE, profile})
export const setProfileAvatar = (profileAvatar) => ({type: SET_PROFILE_AVATAR, profileAvatar})

export const getProfile = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id)
    if (response.status === 200) {
        dispatch(setProfile(response.data))
    } else {
        return response.data.message
    }

}

export const updateProfile = (profile) => async (dispatch) => {
    let data = await profileAPI.updateProfile(profile)
    if (data.status !== 200) {
        const response = {
            message: data.data.message,
            status: data.status
        }
        dispatch(setProfile(response.data))
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

export const updateAvatar = (avatar, id) => async (dispatch) => {
    let data = await profileAPI.updateAvatar(avatar, id)
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

export const deleteAvatar = (id) => async (dispatch) => {
    let data = await profileAPI.deleteAvatar(id)
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

/*export const getAvatar = (avatarName) => async (dispatch) => {
    let data = await profileAPI.getAvatar(avatarName)
    console.log(data)
    dispatch(setProfileAvatar(data))
}*/

export default profileReducer;
