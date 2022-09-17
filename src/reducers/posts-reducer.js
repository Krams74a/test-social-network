import {postsAPI} from "../api/api"
import {getLoggedUser, getLoggedUserPosts, isAuth} from "./auth-reducer";
import {getProfilePosts} from "./profile-reducer";
import {getGroupPosts, getGroupProfile} from "./groupProfile-reducer";

const SET_POSTS = "posts/SET_POSTS"
const ADD_POST = "posts/ADD_POST"
const LIKE_POST = "posts/LIKE_POST"
const DISLIKE_POST = "posts/DISLIKE_POST"
const DELETE_POST = "posts/DELETE_POST"

let initialState = {
    postsInfo: []
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                postsInfo: [...action.posts]
            }
        case ADD_POST:
            let newPost = {
                author: action.author,
                title: action.title,
                content: action.content
            }
            return {
                ...state,
                postsInfo: [newPost, ...state.postsInfo],
            }
        case DELETE_POST:
            return {
                ...state,
                postsInfo: state.postsInfo.filter(post => post.id !== action.id)
            }
        default:
            return state
    }
}

export const setPosts = (posts) => ({type: SET_POSTS, posts})
export const addNewPost = (author, title, content) => ({type: ADD_POST, author, title, content})
export const setLikedPost = (postId, likesCount, isLiked) => ({type: LIKE_POST, postId, likesCount, isLiked})
export const setDislikedPost = (postId, likesCount, isLiked) => ({type: DISLIKE_POST, postId, likesCount, isLiked})
export const deletePostAction = (id) => ({type: DELETE_POST, id})

export const getPosts = (loggedUsername) => async (dispatch) => {
    let data = await postsAPI.getPosts()
    data.forEach(post => {
        console.log(post)
        post.isLiked = false
        post.likedUsers.forEach(username => {
            post.isLiked = username === loggedUsername;
        })
    })
    console.log(data)
    dispatch(setPosts(data))
}

export const addPost = (author, title, content, postType, placeOfCreation) => async (dispatch) => {
    let response = await postsAPI.addPost(author, title, content, postType, placeOfCreation)
    if (response.status === 200) {
        switch (postType) {
            case "General":
                dispatch(getPosts(author))
                return response.data
            case "Profile":
                dispatch(getPosts(author))
                dispatch(getLoggedUserPosts(placeOfCreation))
                dispatch(getProfilePosts(placeOfCreation, author))
                return response.data
            case "Group":
                dispatch(getGroupProfile(placeOfCreation, author))
                return response.data
            default:
                dispatch(getPosts(author))
                return response.data
        }
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

export const likePost = (postId, userId) => async (dispatch) => {
    let response = await postsAPI.likePost(postId, userId)
    if (response.status === 200) {
        console.log(response.data.postType)
        switch (response.data.postType) {
            case "General":
                dispatch(getPosts(userId))
                return response.data
            case "Profile":
                dispatch(getPosts(userId))
                dispatch(getLoggedUserPosts(response.data.placeOfCreation))
                dispatch(getProfilePosts(response.data.placeOfCreation, userId))
                return response.data
            case "Group":
                dispatch(getGroupProfile(response.data.placeOfCreation, userId))
                return response.data
            default:
                dispatch(getPosts(userId))
                return response.data
        }

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
        switch (response.data.postType) {
            case "General":
                dispatch(getPosts(userId))
                return response.data
            case "Profile":
                dispatch(getPosts(userId))
                dispatch(getLoggedUserPosts(response.data.placeOfCreation))
                dispatch(getProfilePosts(response.data.placeOfCreation, userId))
                return response.data
            case "Group":
                dispatch(getGroupProfile(response.data.placeOfCreation, userId))
            default:
                dispatch(getPosts(userId))
                return response.data
        }
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
    let response = await postsAPI.deletePost(id)
    switch (response.postType) {
        case "General":
            dispatch(getPosts(response.author))
            return response
        case "Profile":
            console.log(response)
            dispatch(getPosts(response.author))
            dispatch(getLoggedUserPosts(response.placeOfCreation))
            dispatch(getProfilePosts(response.placeOfCreation, response.author))
            return response
        case "Group":
            dispatch(getGroupProfile(response.placeOfCreation, response.author))
            return response
        default:
            dispatch(getPosts(response.author))
            return response
    }
}

export default postsReducer;
