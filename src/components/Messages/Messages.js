import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import React, {useEffect} from "react";
import Message from "./Message/Message";
import Preloader from "../Preloader/Preloader";
import {getMessages, getNewMessages, sendMessage} from "../../reducers/messages-reducer";
import AddMessage from "./AddMessage/AddMessage";

const MessagesPage = (props) => {
    useEffect(() => {
        props.getMessages()
        props.getNewMessages()
    }, [])
    if (!props.messagesInfo) return <Preloader />
    return (
        <div>
            <AddMessage loggedUserInfo={props.loggedUserInfo} sendMessage={props.sendMessage}/>
            {[...props.messagesInfo].reverse().map(message => <Message content={message.content} author={message.author} />)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo,
        messagesInfo: state.messages.messagesInfo
    }
}

const MessagesPageContainer = compose(
    connect(mapStateToProps, {getMessages, getNewMessages, sendMessage}),
    withAuthRedirect
)(MessagesPage)

export default MessagesPageContainer
