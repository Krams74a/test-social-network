import React from 'react';
import {compose} from "redux";
import GroupInfoCard from "./GroupInfoCard/GroupInfoCard";
import GroupAdditionalInfoPage from "./GroupAdditionalInfoPage/GroupAdditionalInfoPage";
import AddPost from "../../../Utils/AddPost/AddPost";
import GroupPosts from "../GroupPosts/GroupPosts";

const GroupInfoPage = ({groupDescription, groupName, groupAuthor, loggedUserInfoUsername, groupMembers, addPost, loggedUserInfo, groupPosts, likePost, dislikePost, deletePost}) => {
    return (
        <div>
            <GroupInfoCard groupDescription={groupDescription} groupName={groupName} groupAuthor={groupAuthor} loggedUserInfoUsername={loggedUserInfoUsername}/>
            <div>
                {groupAuthor === loggedUserInfo.username
                    ? <div style={{background: "#f3f3f3", marginBottom: "10px", padding: "10px"}} className="card">
                        <AddPost addPost={addPost} loggedUserInfo={loggedUserInfo} postType={"Group"} placeOfCreation={groupName} />
                    </div>
                    : null
                }

                <GroupPosts groupPosts={groupPosts} likePost={likePost} dislikePost={dislikePost} deletePost={deletePost} loggedUserInfo={loggedUserInfo}/>
            </div>
        </div>
    );
};

const GroupProfileInfoPageContainer = compose()(GroupInfoPage)

export default GroupProfileInfoPageContainer;
