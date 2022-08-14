import {messagesAPI} from "../api/api"

const SET_MESSAGES = "users/SET_MESSAGES"
const NEW_MESSAGE = "users/NEW_MESSAGE"

let initialState = {
    messagesInfo: []
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messagesInfo: [...action.messages]
            }
        case NEW_MESSAGE:
            return {
                ...state,
                messagesInfo: [...state.messagesInfo, action.newMessage]
            }
        default:
            return state
    }
}

export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const setNewMessage = (newMessage) => ({type: NEW_MESSAGE, newMessage})

export const getMessages = () => async (dispatch) => {
    let data = await messagesAPI.getMessages()
    dispatch(setMessages(data.data))
}

export const getNewMessages = () => async (dispatch) => {
    let data = await messagesAPI.getNewMessages()
    dispatch(setNewMessage(data.data))
}

export const sendMessage = (author, content) => async (dispatch) => {
    await messagesAPI.sendMessage(author, content)
}

export default messagesReducer;
