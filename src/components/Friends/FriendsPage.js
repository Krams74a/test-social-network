import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {
    applyIncomingRequest,
    cancelIncomingRequest,
    getFriends, getIncomingRequests,
} from "../../reducers/friends-reducer";
import {useLocation} from "react-router";
import {Badge, Nav} from "react-bootstrap"
import AllFriends from "./AllFriends/AllFriends";
import OutgoingRequests from "./OutgoingRequests/OutgoingRequests";
import IncomingRequests from "./IncomingRequests/IncomingRequests";

const FriendsPage = (props) => {
    const [eventKey, setEventKey] = useState("friends")

    const location = useLocation();
    const userId = location.pathname.split("/")[2]
    useEffect(() => {
        props.getFriends(userId)
        props.getIncomingRequests(props.loggedUserInfoUsername)
    }, [])

    if (!props.friendsList || !props.incomingRequests) return <div>Loading...</div>

    const getCountIncomingRequests = () => {
        return props.incomingRequests.length
    }

    return (
        <div>
            <h1>Ваши друзья</h1>
            <Nav variant="tabs" defaultActiveKey={eventKey} style={{marginBottom: "15px"}}>
                <Nav.Item>
                    <Nav.Link eventKey="friends" onClick={() => {setEventKey("friends")}}>
                        Друзья
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="incomingRequests" onClick={() => {setEventKey("incomingRequests")}}>
                        Входящие заявки {getCountIncomingRequests() === 0 ? null : <Badge bg="primary">{getCountIncomingRequests()}</Badge>}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {eventKey === "friends" ? <AllFriends {...props}/> : eventKey === "outgoingRequests" ? <OutgoingRequests {...props} /> : eventKey === "incomingRequests" ? <IncomingRequests {...props} loggedUserInfoUsername={props.loggedUserInfoUsername}/> : null}
            {/*{props.friendsCandidates.length > 0
                ? props.friendsCandidates.map((friendRequest, id) => <FriendCard key={id}
                                                                                 sender={friendRequest.sender}
                                                                                 recipient={friendRequest.recipient}
                                                                                 loggedUserInfoUsername={props.loggedUserInfoUsername}
                                                                                 deleteFriend={props.deleteFriend}/>)
                : <div>У вас нет заявок в друзья...</div>}
            <h1>Мои друзья</h1>
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
        incomingRequests: state.friends.incomingRequests,
        loggedUserInfoUsername: state.auth.loggedUserInfo.username
    }
}

const FriendsPageContainer = compose(
    connect(mapStateToProps, {getFriends, getIncomingRequests, applyIncomingRequest, cancelIncomingRequest}),
    withAuthRedirect
)(FriendsPage)

export default FriendsPageContainer;
