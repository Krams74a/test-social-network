import React, {useEffect, useState} from "react";
import AvatarPlaceholder from "../../../assets/avatar-placeholder.png"

const AvatarCard = ({avatar, username, status, address, loggedUserInfoUsername, addFriend, deleteFriend, friendsList, addFriendCandidate, friendsCandidates, deleteFriendsCandidate}) => {
    const [isCandidate, setIsCandidate] = useState(false)
    const [isSender, setIsSender] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    console.log(isCandidate, isSender, isFriend)
    useEffect(() => {
<<<<<<< HEAD
        friendsCandidates.forEach(friendRequest => {
            if (friendRequest.recipient === username) {
                setIsCandidate(true)
            }
            if (friendRequest.sender === username) {
                setIsSender(true)
            }
        })
        friendsCandidates.forEach(friend => {
            if (friend.username === username) {
                setIsFriend(true)
            }
        })
=======
        friendsList.forEach(friend => {
            if (friend.username === username) {
                setIsFriend(true)
            }
        })
>>>>>>> parent of 445377b (9)
    }, [])

    const acceptFriendHandler = (friendId, userId) => {
        addFriend(friendId, userId)
        addFriend(userId, friendId)
        deleteFriendsCandidate(userId, friendId)
        setIsFriend(true)
        setIsSender(false)
        setIsCandidate(false)
    }

    const deleteFriendHandler = (friendId, userId) => {
        deleteFriend(friendId, userId)
        setIsFriend(false)
        setIsSender(false)
        setIsCandidate(false)
    }

    const addFriendCandidateHandler = (friendId, userId) => {
        addFriendCandidate(friendId, userId)
        setIsCandidate(true)
    }

    const deleteFriendCandidateHandler = (friendId, userId) => {
        deleteFriendsCandidate(friendId, userId)
        setIsCandidate(false)
        setIsSender(false)
    }

    const buttonTextChanger = () => {
        if (isSender) {
            return "Принять заявку"
        } else {
            if (isCandidate) {
                return "Отменить заявку"
            } else {
                if (isFriend) {
                    return "Удалить из друзей"
                } else {
                    return "Добавить в друзья"
                }
            }
        }
    }

    const buttonHandlerChanger = () => {
        if (isSender) {
            acceptFriendHandler(username, loggedUserInfoUsername)
        } else {
            if (isCandidate) {
                deleteFriendCandidateHandler(username, loggedUserInfoUsername)
            } else {
                if (isFriend) {
                    deleteFriendHandler(username, loggedUserInfoUsername)
                } else {
                    addFriendCandidateHandler(username, loggedUserInfoUsername)
                }
            }
        }
    }

    return (
        <div className="card" style={{backgroundColor: "#f3f3f3"}}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    {
                        avatar
                            ? <img style={{height: "150px", width: "150px"}}
                                   src={`https://dry-meadow-99203.herokuapp.com/${avatar}`}
                                   onError={({currentTarget}) => {
                                       currentTarget.onerror = null; // prevents looping
                                       currentTarget.src = AvatarPlaceholder;
                                   }}
                                   className="rounded-circle" width="150" alt={"User"}/>
                            : <img style={{height: "150px", width: "150px"}} src={AvatarPlaceholder}
                                   onError={({currentTarget}) => {
                                       currentTarget.onerror = null; // prevents looping
                                       currentTarget.src = AvatarPlaceholder;
                                   }}
                                   className="rounded-circle" width="150" alt={"User"}/>
                    }

                    <div className="mt-3">
                        <h4>{username}</h4>
                        <p className="text-secondary mb-1">{status || "Отсутствует"}</p>
                        <p className="text-muted font-size-sm">{address || "Отсутствует"}</p>
                        {!(loggedUserInfoUsername === username)
                            ? <button className="btn btn-primary" style={{marginRight: "10px"}}
                                      onClick={buttonHandlerChanger}>{buttonTextChanger()}</button>
                            : null
                        }
                        {/*{!(loggedUserInfoUsername === username) ?
                            <button className="btn btn-outline-primary">Сообщение</button> : null}*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvatarCard
