import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const GroupInfoCard = ({loggedUserInfoUsername, groupAuthor, groupName, groupDescription}) => {
    const navigate = useNavigate()

    const navigateToSettings = () => {
        navigate("/settings/group")
    }

    return (
        <div className="card mb-3" style={{backgroundColor: "#f3f3f3"}}>
            <div className="card-body">
                <h4>{groupName}</h4>
                <p className="text-secondary mb-1">{groupDescription || "Отсутствует"}</p>
                {
                    loggedUserInfoUsername === groupAuthor
                        ? <div className="row">

                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default GroupInfoCard
