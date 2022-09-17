import React, {useEffect} from 'react';
import LoggedUserAdditionalInfoPage from "./LoggedUserAdditionalInfoPage/LoggedUserAdditionalInfoPage";
import {withPublicSettings} from "../../../../hoc/withPublicSettings";
import {compose} from "redux";
import LoggedUserInfoCard from "./LoggedUserInfoCard/LoggedUserInfoCard";
import AddPost from "../../../Utils/AddPost/AddPost";
import Post from "../../../Posts/Post/Post";
import {getLoggedUserPosts} from "../../../../reducers/auth-reducer";
import {connect} from "react-redux";
import LoggedUserPosts from "./LoggedUserPosts/LoggedUserPosts";

const LoggedUserProfileInfoPage = (props) => {
    const addPost = (username, title, content, postType, postPlaceOfCreation) => {
        props.addPost(username, title, content, postType, postPlaceOfCreation)
        props.getLoggedUserPosts(username)
    }

    const deletePost = (postId) => {
        props.deletePost(postId)
    }

    return (
        <div>
            <LoggedUserInfoCard sex={props.sex} address={props.address}
                                birthday={props.birthday} email={props.email}
                                fullname={props.fullName}
                                phoneNumber={props.phoneNumber}/>
            <LoggedUserAdditionalInfoPage profileGroupsList={props.profileGroupsList}
                                          profileFriends={props.profileFriends}/>
            <div>
                <div style={{background: "#f3f3f3", marginBottom: "10px", padding: "10px"}} className="card">
                    <AddPost addPost={addPost} loggedUserInfo={props.loggedUserInfo} postType={"Profile"} placeOfCreation={props.loggedUserInfo.username} />
                </div>
                <LoggedUserPosts loggedUserPosts={props.loggedUserPosts} likePost={props.likePost} dislikePost={props.dislikePost} deletePost={deletePost} loggedUserInfo={props.loggedUserInfo}/>
            </div>
        </div>
    );
};

export default LoggedUserProfileInfoPage;
