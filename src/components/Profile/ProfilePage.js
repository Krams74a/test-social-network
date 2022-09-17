import React, {useEffect, useState} from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getProfile,
    getProfileFriends,
    getProfileGroupsList,
    getProfileIncomingRequests
} from "../../reducers/profile-reducer";
import {useLocation} from "react-router";
import Preloader from "../Preloader/Preloader";
import {
    applyIncomingRequest,
    cancelIncomingRequest,
    getFriends,
    getIncomingRequests, removeFromFriends, sendIncomingRequest, stopIncomingRequest
} from "../../reducers/friends-reducer";
import {getUserGroupsList} from "../../reducers/users-reducer";
import UserProfile from "./UserProfile/UserProfile";
import LoggedUserProfile from "./LoggedUserProfile/LoggedUserProfile";
import UserProfileContainer from "./UserProfile/UserProfile";

const ProfilePage = (props) => {
    const location = useLocation();
    const userId = location.pathname.split("/")[2]
    /*const [error, setError] = useState()*/

    /*const checkIsFriend = () => {
        props.friendsList.forEach(friend => {
            if (friend.username === props.profileInfo.username) {
                return true
            }
        })
    }*/

    if (props.loggedUserInfo.username === userId) {
        return (
            <LoggedUserProfile {...props} />
        )
    } else {
        return (
            <UserProfileContainer />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo,
        profileInfo: state.profile.profileInfo,
        profileFriends: state.profile.profileFriends,
        friendsList: state.friends.friendsList,
        incomingRequests: state.friends.incomingRequests,
        profileIncomingRequests: state.profile.profileIncomingRequests,
        profileGroupsList: state.profile.groupsList,
        userGroupsList: state.users.groupsList
    }
}

const ProfileContainer = compose(
    connect(mapStateToProps, {
        getProfile,
        sendIncomingRequest,
        stopIncomingRequest,
        getFriends,
        cancelIncomingRequest,
        applyIncomingRequest,
        removeFromFriends,
        getProfileFriends,
        getIncomingRequests,
        getProfileIncomingRequests,
        getUserGroupsList,
        getProfileGroupsList
    }),
    withAuthRedirect
)(ProfilePage)

export default ProfileContainer;
