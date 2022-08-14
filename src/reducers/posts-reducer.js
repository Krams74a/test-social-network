import {postsAPI} from "../api/api"

const SET_POSTS = "users/SET_POSTS"
const ADD_POST = "users/ADD_POST"
const DELETE_POST = "users/DELETE_POST"

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
export const deletePostAction = (id) => ({type: DELETE_POST, id})

export const getPosts = () => async (dispatch) => {
    let data = await postsAPI.getPosts()
    dispatch(setPosts(data))
}

export const addPost = (author, title, content) => async (dispatch) => {
    let response = await postsAPI.addPost(author, title, content)
    if (response.status === 200) {
        dispatch(getPosts())
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
    dispatch(getPosts())
}

export default postsReducer;
