import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import postsReducer from "./reducers/posts-reducer";
import authReducer from "./reducers/auth-reducer";
import {appReducer} from "./reducers/app-reducer";
import usersReducer from "./reducers/users-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {messagesReducer} from "./reducers/messages-reducer";
import friendsReducer from "./reducers/friends-reducer";
import {groupsReducer} from "./reducers/groups-reducer";
import groupProfileReducer from "./reducers/groupProfile-reducer";


let reducers = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    groups: groupsReducer,
    groupProfile: groupProfileReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;
