import React from "react";
import BigAvatar from "../../../Avatar/User/BigAvatar/BigAvatar";

const AvatarCard = ({getAllInfo, avatar, username, status, address, loggedUserInfoUsername, incomingRequests, profileFriends, profileIncomingRequests, sendIncomingRequest, stopIncomingRequest, applyIncomingRequest, removeFromFriends}) => {
    const buttonHandlerChanger = () => {
        if (profileIncomingRequests.length > 0) {
            if (profileIncomingRequests.includes(loggedUserInfoUsername)) {
                stopIncomingRequest(username, loggedUserInfoUsername)
                getAllInfo()
                return null
            }
            stopIncomingRequest(username, loggedUserInfoUsername)
            getAllInfo()
            return null
        }
        if (incomingRequests.includes(username)) {
            applyIncomingRequest(username, loggedUserInfoUsername)
            getAllInfo()
            return null
        }
        if (profileFriends.filter(friend => friend.username === loggedUserInfoUsername).length > 0) {
            removeFromFriends(username, loggedUserInfoUsername)
            getAllInfo()
            return null
        }
        if ((profileFriends.filter(friend => friend.username === loggedUserInfoUsername).length === 0)) {
            if (profileIncomingRequests) {
                if (!(profileIncomingRequests.includes(loggedUserInfoUsername))) {
                    sendIncomingRequest(username, loggedUserInfoUsername)
                    getAllInfo()
                    return null
                }
            }
            sendIncomingRequest(username, loggedUserInfoUsername)
            getAllInfo()
            return null
        }


    }
    const buttonTextChanger = () => {
        if (profileIncomingRequests.length > 0) {
            if (profileIncomingRequests.includes(loggedUserInfoUsername)) {
                return "Отменить заявку"
            }
            return "Отменить заявку"
        }
        if (incomingRequests.includes(username)) {
            return "Принять заявку"
        }
        if (profileFriends.filter(friend => friend.username === loggedUserInfoUsername).length > 0) {
            return "Удалить из друзей"
        }
        if ((profileFriends.filter(friend => friend.username === loggedUserInfoUsername).length === 0)) {
            if (profileIncomingRequests) {
                if (!(profileIncomingRequests.includes(loggedUserInfoUsername))) {
                    return "Добавить в друзья"
                }
            }
            return "Добавить в друзья"
        }


    }

    return (
        <div className="card" style={{backgroundColor: "#f3f3f3"}}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <BigAvatar avatarUrl={avatar}/>
                    <div className="mt-3">
                        <h4>{username}</h4>
                        <p className="text-secondary mb-1">{status || "Отсутствует"}</p>
                        <p className="text-muted font-size-sm">{address || "Отсутствует"}</p>
                        {!(loggedUserInfoUsername === username)
                            ? <button className="btn btn-primary" style={{marginRight: "10px"}}
                                      onClick={buttonHandlerChanger}>{buttonTextChanger()}</button>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvatarCard
