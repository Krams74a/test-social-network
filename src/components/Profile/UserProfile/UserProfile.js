import React, {useEffect, useState} from 'react';
import AvatarCard from "./AvatarCard/AvatarCard";
import LinksCardContainer from "./LinksCard/LinksCard";
import ProfileInfoPage from "./ProfileInfoPage/ProfileInfoPage";
import {useLocation} from "react-router";
import {connect} from "react-redux";
import {getProfile} from "../../../reducers/profile-reducer";
import Preloader from "../../Preloader/Preloader";
import {addPost, deletePost, dislikePost, likePost} from "../../../reducers/posts-reducer";

const UserProfile = (props) => {
    const location = useLocation();
    const userId = location.pathname.split("/")[2]

    const checkIsFriend = () => {
        props.friendsList.forEach(friend => {
            if (friend.username === props.profileInfo.username) {
                return true
            }
        })
    }

    useEffect(() => {
        console.log(userId)
        props.getProfile(userId, props.loggedUserInfoUsername)
    }, [])

    console.log(props.profileInfo)
    if (!props.profileInfo) return <Preloader/>

    return (
        <div className="container">
            <h1>Профиль</h1>
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <AvatarCard username={props.profileInfo.username} status={props.profileInfo.status}
                                    address={props.profileInfo.address} avatar={props.profileInfo.croppedAvatarUrl}
                                    profileFriends={props.profileFriendsList}
                                    sendIncomingRequest={props.sendIncomingRequest}
                                    stopIncomingRequest={props.stopIncomingRequest}
                                    cancelIncomingRequest={props.cancelIncomingRequest}
                                    applyIncomingRequest={props.applyIncomingRequest}
                                    removeFromFriends={props.removeFromFriends}
                                    profileIncomingRequests={props.profileIncomingRequests}
                                    incomingRequests={props.loggedUserIncomingRequests}
                                    loggedUserInfoUsername={props.loggedUserInfoUsername}/>
                        <LinksCardContainer website={props.profileInfo.website} github={props.profileInfo.github}
                                            facebook={props.profileInfo.facebook}
                                            instagram={props.profileInfo.instagram}
                                            twitter={props.profileInfo.twitter}
                                            publicSettings={props.profileInfo.publicSettings}
                                            isFriend={checkIsFriend} profileFriends={props.profileFriendsList}
                                            profile={props.profileInfo}
                                            loggedUserInfoUsername={props.loggedUserInfoUsername}/>
                    </div>
                    <div className="col-md-8">
                        <ProfileInfoPage sex={props.profileInfo.sex} address={props.profileInfo.address}
                                         birthday={props.profileInfo.birthday} email={props.profileInfo.email}
                                         fullname={props.profileInfo.fullName}
                                         phoneNumber={props.profileInfo.phoneNumber}
                                         publicSettings={props.profileInfo.publicSettings}
                                         isFriend={checkIsFriend}
                                         profileFriends={props.profileFriendsList}
                                         profile={props.profileInfo}
                                         profileGroupsList={props.profileGroupsList}
                                         loggedUserInfoUsername={props.loggedUserInfoUsername}
                                         loggedUserInfo={props.loggedUserInfo} profileInfo={props.profileInfo}
                                         profilePosts={props.profilePosts} likePost={props.likePost}
                                         dislikePost={props.dislikePost} addPost={props.addPost}
                                         deletePost={props.deletePost} getProfile={props.getProfile}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        profileInfo: state.profile.profileInfo,
        profileFriendsList: state.profile.profileFriends,
        profileGroupsList: state.profile.groupsList,
        profileIncomingRequests: state.profile.profileIncomingRequests,
        profilePosts: state.profile.profilePosts,
        loggedUserIncomingRequests: state.auth.loggedUserIncomingRequests,
        loggedUserInfoUsername: state.auth.loggedUserInfo.username,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const UserProfileContainer = connect(mapStateToProps, {
    getProfile,
    likePost,
    dislikePost,
    deletePost,
    addPost
})(UserProfile)

export default UserProfileContainer;
