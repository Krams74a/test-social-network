import React, {useEffect} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {deleteFriend, getFriends, getFriendsCandidates} from "../../reducers/friends-reducer";
import {useLocation} from "react-router";
import FriendCard from "./FriendCard/FriendCard";

const FriendsPage = (props) => {
    const location = useLocation();
    const userId = location.pathname.split("/")[2]
    useEffect(() => {
        props.getFriends(userId)
        props.getFriendsCandidates(props.loggedUserInfoUsername)
    }, [])
<<<<<<< HEAD
    if (!props.friendsList || !props.friendsCandidates) return <div>Loading...</div>
=======
    if (!props.friendsList) return <div>Loading...</div>
    if (props.friendsList.length === 0) return <div>У вас пока нет друзей...</div>
>>>>>>> parent of 445377b (9)
    return (
        <div>
            <h1>Заявки в друзья</h1>
            {props.friendsCandidates.length > 0
                ? props.friendsCandidates.map((friendRequest, id) => <FriendCard key={id}
                                                                                 sender={friendRequest.sender}
                                                                                 recipient={friendRequest.recipient}
                                                                                 loggedUserInfoUsername={props.loggedUserInfoUsername}
                                                                                 deleteFriend={props.deleteFriend}/>)
                : <div>У вас нет заявок в друзья...</div>}
            {/*<h1>Мои друзья</h1>
            {props.friendsList.length > 0 ? props.friendsList.map((friend, id) => <FriendCard key={id}
                                                                                              username={friend.username}
                                                                                              status={friend.status}
                                                                                              loggedUserInfoUsername={props.loggedUserInfoUsername}
                                                                                              deleteFriend={props.deleteFriend}/>)
                : <div>У вас пока нет друзей...</div>
            }*/}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        friendsList: state.friends.friendsList,
        friendsCandidates: state.friends.friendsCandidates,
        loggedUserInfoUsername: state.auth.loggedUserInfo.username
    }
}

const FriendsPageContainer = compose(
    connect(mapStateToProps, {getFriends, deleteFriend, getFriendsCandidates}),
    withAuthRedirect
)(FriendsPage)

export default FriendsPageContainer;
