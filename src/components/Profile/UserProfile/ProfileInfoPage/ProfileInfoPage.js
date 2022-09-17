import React from 'react';
import AdditionalInfoPage from "./AdditionalInfoPage/AdditionalInfoPage";
import {withPublicSettings} from "../../../../hoc/withPublicSettings";
import {compose} from "redux";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import AddPost from "../../../Utils/AddPost/AddPost";
import LoggedUserPosts from "../../LoggedUserProfile/LoggedUserProfileInfoPage/LoggedUserPosts/LoggedUserPosts";
import ProfilePosts from "./ProfilePosts/ProfilePosts";

const ProfileInfoPage = (props) => {
    const addPost = (username, title, content, postType, postPlaceOfCreation) => {
        props.addPost(username, title, content, postType, postPlaceOfCreation)
        props.getProfile(props.profileInfo.username, props.loggedUserInfoUsername)
    }

    const deletePost = (postId, loggedUsername) => {
        props.deletePost(postId)
        props.getProfile(props.profileInfo.username, props.loggedUserInfoUsername)
    }

    return (
        <div>
            <UserInfoCard loggedUserInfoUsername={props.loggedUserInfoUsername} username={props.username}
                                   sex={props.sex} address={props.address}
                                   birthday={props.birthday} email={props.email}
                                   fullname={props.fullName}
                                   phoneNumber={props.phoneNumber}
                                   publicSettings={props.publicSettings} isFriend={props.checkIsFriend} profileFriends={props.profileFriends} profile={props.profileInfo}/>
            <AdditionalInfoPage profileGroupsList={props.profileGroupsList}
                                profileFriends={props.profileFriends}
                                profile={props.profileInfo}
                                loggedUserInfoUsername={props.loggedUserInfoUsername}
                                username={props.username}
                                publicSettings={props.publicSettings}/>
            <div>
                <div style={{background: "#f3f3f3", marginBottom: "10px", padding: "10px"}} className="card">
                    <AddPost addPost={addPost} loggedUserInfo={props.loggedUserInfo} postType={"Profile"} placeOfCreation={props.profileInfo.username} />
                </div>
                <ProfilePosts profilePosts={props.profilePosts} likePost={props.likePost} dislikePost={props.dislikePost} deletePost={deletePost} loggedUserInfo={props.loggedUserInfo}/>
            </div>
        </div>
    );
};

const ProfileInfoPageContainer = compose(withPublicSettings)(ProfileInfoPage)

export default ProfileInfoPageContainer;
