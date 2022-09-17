import React, {useState} from "react";
import BigAvatar from "../../../Avatar/User/BigAvatar/BigAvatar";
import {Button} from "react-bootstrap";
import GroupBigAvatar from "../../../Avatar/Group/GroupBigAvatar/GroupBigAvatar";
import {useNavigate} from "react-router-dom";

const GroupAvatarCard = ({groupAvatar, groupAuthor, groupDescription, groupName, follow, unfollow, isMember, username, getAllInfo}) => {
    const navigate = useNavigate()

    const navigateToSettings = () => {
        navigate(`/settings/group/${groupName}`)
    }

    const onFollow = () => {
        follow(groupName, username)
    }

    const onUnfollow = () => {
        unfollow(groupName, username)
    }

    return (
        <div className="card" style={{backgroundColor: "#f3f3f3"}}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <GroupBigAvatar avatarUrl={groupAvatar}/>
                    <div className="mt-3">
                        {!(groupAuthor === username) ? isMember
                            ? <Button onClick={onUnfollow}>Отписаться</Button>
                            : <Button onClick={onFollow}>Подписаться</Button> : <Button onClick={navigateToSettings}>Редактировать</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupAvatarCard
