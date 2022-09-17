import React, {useEffect} from 'react';
import LoggedUserAvatarCard from "./LoggedUserAvatarCard/LoggedUserAvatarCard"
import LinksCardContainer from "./LoggedUserLinksCard/LoggedUserLinksCard";
import ProfileInfoPage from "./LoggedUserProfileInfoPage/LoggedUserProfileInfoPage";
import {connect} from "react-redux";
import LoggedUserLinksCardContainer from "./LoggedUserLinksCard/LoggedUserLinksCard";
import LoggedUserProfileInfoPage from "./LoggedUserProfileInfoPage/LoggedUserProfileInfoPage";
import {addPost, deletePost, dislikePost, getPosts, likePost} from "../../../reducers/posts-reducer";
import {
    getLoggedUser,
    getLoggedUserPosts,
    isAuth,
} from "../../../reducers/auth-reducer";
import Preloader from "../../Preloader/Preloader";
import {useLocation} from "react-router";

const LoggedUserProfile = (props) => {
    console.log("RERENDER")
    const location = useLocation();
    const userId = location.pathname.split("/")[2]

    useEffect(() => {
        props.getLoggedUser(userId)
    }, [userId])

    if (!props.loggedUserProfile) return <Preloader />

    return (
        <div className="container">
            <h1>Профиль</h1>
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <LoggedUserAvatarCard username={props.loggedUserProfile.username}
                                              status={props.loggedUserProfile.status}
                                              address={props.loggedUserProfile.address}
                                              avatar={props.loggedUserProfile.croppedAvatarUrl}/>
                        <LoggedUserLinksCardContainer website={props.loggedUserProfile.website}
                                                      github={props.loggedUserProfile.github}
                                                      facebook={props.loggedUserProfile.facebook}
                                                      instagram={props.loggedUserProfile.instagram}
                                                      twitter={props.loggedUserProfile.twitter}/>
                    </div>
                    <div className="col-md-8">
                        <LoggedUserProfileInfoPage loggedUserInfoUsername={props.loggedUserInfo.username}
                                                   username={props.loggedUserProfile.username}
                                                   sex={props.loggedUserProfile.sex}
                                                   address={props.loggedUserProfile.address}
                                                   birthday={props.loggedUserProfile.birthday}
                                                   email={props.loggedUserProfile.email}
                                                   fullname={props.loggedUserProfile.fullName}
                                                   phoneNumber={props.loggedUserProfile.phoneNumber}
                                                   publicSettings={props.loggedUserProfile.publicSettings}
                                                   isFriend={props.checkIsFriend}
                                                   profileFriends={props.loggedUserFriendsList}
                                                   profile={props.loggedUserProfile}
                                                   profileGroupsList={props.loggedUserGroupsList}
                                                   addPost={props.addPost}
                                                   loggedUserInfo={props.loggedUserInfo}
                                                   loggedUserPosts={props.loggedUserPosts}
                                                    likePost={props.likePost} deletePost={props.deletePost} dislikePost={props.dislikePost} getLoggedUserPosts={props.getLoggedUserPosts} getPosts={props.getPosts}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedUserInfo: state.auth.loggedUserInfo,
        loggedUserProfile: state.auth.loggedUserProfile,
        loggedUserFriendsList: state.auth.loggedUserFriendsList,
        loggedUserGroupsList: state.auth.loggedUserGroupsList,
        loggedUserIncomingRequests: state.auth.loggedUserIncomingRequests,
        loggedUserPosts: state.auth.loggedUserPosts
    }
}

const LoggedUserProfileContainer = connect(mapStateToProps, {addPost, isAuth, likePost, dislikePost, deletePost, getLoggedUser, getPosts})(LoggedUserProfile)

export default LoggedUserProfileContainer;
