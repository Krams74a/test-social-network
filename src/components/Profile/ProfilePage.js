import React, {useEffect, useState} from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {connect} from "react-redux";
import AvatarCard from "./AvatarCard/AvatarCard";
import LinksCard from "./LinksCard/LinksCard";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import {getAvatar, getProfile} from "../../reducers/profile-reducer";
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router";
import Preloader from "../Preloader/Preloader";
import {
    addFriend,
    addFriendCandidate,
    deleteFriend, deleteFriendsCandidate,
    getFriends,
    getFriendsCandidates
} from "../../reducers/friends-reducer";

const ProfilePage = (props) => {
    const location = useLocation();
    const userId = location.pathname.split("/")[2]
    const [error, setError] = useState()
    useEffect(() => {
        props.getProfile(userId)
        props.getFriendsCandidates(props.loggedUserInfo.username)
        props.getFriends(props.loggedUserInfo.username)
    }, [userId])

    if (!props.profileInfo || !props.friendsList || !props.friendsCandidates) return <Preloader/>
    if (error) return <div>Пользователя с данным именем не существует. Вы можете создать свою <NavLink
        to={"/register"}>страницу.</NavLink></div>
<<<<<<< HEAD
    if (!(props.profileInfo.username === userId)) return <Preloader/>
=======
>>>>>>> parent of 445377b (9)
    return (
        <div className="container">
            <h1>Профиль</h1>
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <AvatarCard username={props.profileInfo.username} status={props.profileInfo.status}
                                    address={props.profileInfo.address} avatar={props.profileInfo.avatarUrl}
                                    loggedUserInfoUsername={props.loggedUserInfo.username} addFriend={props.addFriend}
                                    deleteFriend={props.deleteFriend} friendsList={props.friendsList}
                                    addFriendCandidate={props.addFriendCandidate}
                                    friendsCandidates={props.friendsCandidates}
                                    deleteFriendsCandidate={props.deleteFriendsCandidate}/>
                        <LinksCard website={props.profileInfo.website} github={props.profileInfo.github}
                                   facebook={props.profileInfo.facebook} instagram={props.profileInfo.instagram}
                                   twitter={props.profileInfo.twitter} isPublic={props.profileInfo.isPublic}
                                   loggedUserInfo={props.loggedUserInfo} username={props.profileInfo.username}/>
                    </div>
                    <div className="col-md-8">
                        <UserInfoCard loggedUserInfo={props.loggedUserInfo} username={props.profileInfo.username}
                                      sex={props.profileInfo.sex} address={props.profileInfo.address}
                                      birthday={props.profileInfo.birthday} email={props.profileInfo.email}
                                      fullname={props.profileInfo.fullName}
                                      phoneNumber={props.profileInfo.phoneNumber}
                                      isPublic={props.profileInfo.isPublic}/>
                        {/*<AdditionalInfoPage/>*/}
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo,
        profileInfo: state.profile.profileInfo,
        friendsList: state.friends.friendsList,
        friendsCandidates: state.friends.friendsCandidates
    }
}

const ProfileContainer = compose(
    connect(mapStateToProps, {
        getProfile,
        addFriend,
        deleteFriend,
        getFriends,
        addFriendCandidate,
        getFriendsCandidates,
        deleteFriendsCandidate
    }),
    withAuthRedirect
)(ProfilePage)

export default ProfileContainer;
