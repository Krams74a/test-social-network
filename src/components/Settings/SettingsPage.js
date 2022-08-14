import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Nav} from "react-bootstrap";
import React, {useState} from "react";
import {deleteAvatar, getProfile, updateAvatar, updateProfile} from "../../reducers/profile-reducer";
import {deleteUser} from "../../reducers/users-reducer";
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm";
import PrivateSettingsForm from "./PrivateSettingsForm/PrivateSettingsForm";

const SettingsPage = (props) => {
    const pages = ["Profile", "Private"]
    const [activePage, setActivePage] = useState("Profile")

    return (
        <div>
            <h1>Настройки пользователя</h1>
            <Nav variant="tabs" defaultActiveKey={activePage}>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => setActivePage("Profile")}>Профиль</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => setActivePage("Private")}>Приватность</Nav.Link>
                </Nav.Item>
            </Nav>
            {(activePage === pages[0]) ? <ProfileSettingsForm {...props}/> : <PrivateSettingsForm {...props}/>}
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
