import {groupsAPI} from "../api/api"
import {setUsers} from "./users-reducer";
import {setGroupProfile} from "./groupProfile-reducer";

const CREATE_GROUP = "groups/CREATE_GROUP"
const SET_GROUPS_LIST = "groups/SET_GROUPS_LIST"
const SET_PAGES_INFO = "groups/SET_PAGES_INFO"

let initialState = {
    groupsList: [],
    pagesInfo: {
        limit: 2,
        nextPage: 2,
        page: 1,
        prevPage: null,
        totalPages: null
    }
}

export const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            return state
        case SET_GROUPS_LIST:
            return {
                ...state,
                groupsList: [...action.groupsList],
            }
        case SET_PAGES_INFO:
            return {
                ...state,
                pagesInfo: action.pagesInfo
            }
        default:
            return state
    }
}

export const setGroupsList = (groupsList) => ({type: SET_GROUPS_LIST, groupsList})
export const setPagesInfo = (pagesInfo) => ({type: SET_PAGES_INFO, pagesInfo})

export const createGroup = (groupInfo) => async (dispatch) => {
    let response = await groupsAPI.createGroup(groupInfo)
    dispatch(getGroupsList(1, 10))
    if (response.status === 200) {
        return {statusCode: response.status}
    } else {
        return {statusCode: response.status,
            message: response.data.message
        }
    }
}

export const getGroupsList = (page, perPage) => async (dispatch) => {
    let data = await groupsAPI.getGroupsList(page, perPage)
    dispatch(setGroupsList(data.docs))
    console.log(data.docs)
    data.docs = {}
    const pagesInfo = {
        limit: data.limit,
        nextPage: data.nextPage,
        page: data.page,
        prevPage: data.prevPage,
        totalPages: data.totalPages
    }
    dispatch(setPagesInfo(pagesInfo))
}

export default groupsReducer;
