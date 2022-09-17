import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Nav} from "react-bootstrap";
import React, {useState} from "react";
import {deleteAvatar, getProfile, updateAvatar, updateProfile} from "../../../reducers/profile-reducer";
import {deleteUser} from "../../../reducers/users-reducer";
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm";
import PrivateSettingsForm from "./PrivateSettingsForm/PrivateSettingsForm";
import AvatarSettings from "./AvatarSettings/AvatarSettings";
import AvatarSettingsContainer from "./AvatarSettings/AvatarSettings";

const SettingsPage = (props) => {
    const [activePage, setActivePage] = useState("Profile")

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
                <Nav.Item>
                    <Nav.Link eventKey="Private" onClick={() => setActivePage("Private")}>Приватность</Nav.Link>
                </Nav.Item>
            </Nav>
            {(activePage === "Profile") ?
                    <ProfileSettingsForm {...props}/> : (activePage === "Avatar") ?
                    <AvatarSettingsContainer /> :
                    <PrivateSettingsForm {...props}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo,
        profileInfo: state.profile.profileInfo
    }
}

const SettingsPageContainer = compose(
    connect(mapStateToProps, {getProfile, updateProfile, updateAvatar, deleteUser, deleteAvatar}),
    withAuthRedirect
)(SettingsPage)

export default SettingsPageContainer
