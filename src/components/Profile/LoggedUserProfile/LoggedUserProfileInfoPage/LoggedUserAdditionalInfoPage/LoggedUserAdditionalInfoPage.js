import React from "react";
import SmallAvatar from "../../../../Avatar/User/SmallAvatar/SmallAvatar";
import {useNavigate} from "react-router-dom";

const LoggedUserAdditionalInfoPage = ({profileFriends, profileGroupsList}) => {
    const navigate = useNavigate()
    const navigateToUser = (username) => {
        navigate("/profile/" + username)
    }
    const navigateToGroup = (groupName) => {
        navigate("/groups/" + groupName)
    }
    return (
        <div className="row gutters-sm">
            <div className="col-sm-6 mb-3">
                <div className="card h-100" style={{backgroundColor: "#f3f3f3"}}>
                    <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">Друзья</h6>
                        {profileFriends.length > 0 ? <div style={{display: "flex"}}>
                            {profileFriends.map((friend, key) => {
                                if (key < 5)
                                    return(
                                        <div key={key} style={{marginRight: "15px", cursor: "pointer", textAlign: "center"}} onClick={() => navigateToUser(friend.username)}>
                                            <SmallAvatar avatarUrl={friend.croppedAvatarUrl}/>
                                            <span>{friend.username}</span>
                                        </div>
                                    )
                            })}
                        </div> : <div>У пользователя пока нет друзей...</div>}
                    </div>
                </div>
            </div>
            <div className="col-sm-6 mb-3">
                <div className="card h-100" style={{backgroundColor: "#f3f3f3"}}>
                    <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">Подписки</h6>
                        {profileGroupsList
                            ? profileGroupsList.length > 0
                                ? <div style={{display: "flex"}}>
                                    {profileGroupsList.map((group, key) => {
                                        if (key < 5)
                                            return(
                                                <div key={key} style={{marginRight: "15px", cursor: "pointer", textAlign: "center"}} onClick={() => navigateToGroup(group.groupName)}>
                                                    <SmallAvatar avatarUrl={group.groupCroppedAvatarUrl}/>
                                                    <span>{group.groupName}</span>
                                                </div>
                                            )
                                    })}
                                </div>
                                : <div>У пользователя пока нет подписок...</div>
                            : null
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoggedUserAdditionalInfoPage
