import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Nav} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {deleteAvatar, getProfile, updateAvatar, updateProfile} from "../../../reducers/profile-reducer";
import {deleteUser} from "../../../reducers/users-reducer";
import GroupProfileSettingsForm from "./GroupProfileSettingsForm/GroupProfileSettingsForm";
import AvatarSettings from "./GroupAvatarSettings/GroupAvatarSettings";
import AvatarSettingsContainer from "./GroupAvatarSettings/GroupAvatarSettings";
import {withAuthorRedirect} from "../../../hoc/withAuthorRedirect";
import {useLocation} from "react-router";
import {
    deleteGroup,
    deleteGroupAvatar,
    getGroupProfile,
    updateGroupAvatar,
    updateGroupProfile, uploadGroupAvatar
} from "../../../reducers/groupProfile-reducer";
import GroupAvatarSettings from "./GroupAvatarSettings/GroupAvatarSettings";

const GroupSettingsPage = (props) => {
    const [activePage, setActivePage] = useState("Profile")
    const location = useLocation();
    const groupId = location.pathname.split("/")[3]

    useEffect(() => {
        props.getGroupProfile(groupId)
    }, [groupId])

    return (
        <div>
            <h1>Настройки пользователя</h1>
            <Nav variant="tabs" defaultActiveKey={activePage}>
                <Nav.Item>
                    <Nav.Link eventKey="Profile" onClick={() => setActivePage("Profile")}>Профиль</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Avatar" onClick={() => setActivePage("Avatar")}>Аватар</Nav.Link>
                </Nav.Item>
            </Nav>
            {(activePage === "Profile") ?
                    <GroupProfileSettingsForm {...props}/> : (activePage === "Avatar") ?
                    <GroupAvatarSettings {...props} /> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo,
        groupProfileInfo: state.groupProfile.groupProfileInfo,
    }
}

const GroupSettingsPageContainer = compose(
    connect(mapStateToProps, {getGroupProfile, updateGroupProfile, updateGroupAvatar, uploadGroupAvatar, deleteGroup, deleteGroupAvatar}),
    withAuthRedirect,
    withAuthorRedirect
)(GroupSettingsPage)

export default GroupSettingsPageContainer
