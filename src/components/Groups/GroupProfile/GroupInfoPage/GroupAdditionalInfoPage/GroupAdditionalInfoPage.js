import React from "react";
import SmallAvatar from "../../../../Avatar/User/SmallAvatar/SmallAvatar";
import {useNavigate} from "react-router-dom";

const GroupAdditionalInfoPage = ({groupMembers}) => {
    console.log(groupMembers)
    const navigate = useNavigate()
    const navigateToUser = (username) => {
        navigate("/profile/" + username)
    }
    if (groupMembers)
        return (
            <div className="card mt-3">
                <div className="card-body" style={{backgroundColor: "#f3f3f3"}}>
                    <h6 className="d-flex align-items-center mb-3">Подписчики</h6>
                    {groupMembers.length > 0 ? <div style={{display: "flex"}}>
                        {groupMembers.map((member, key) => {
                            if (key < 5)
                                return (
                                    <div key={key} style={{marginRight: "15px", cursor: "pointer", textAlign: "center"}}
                                         onClick={() => navigateToUser(member.username)}>
                                        <SmallAvatar avatarUrl={member.croppedAvatarUrl}/>
                                        <span>{member.username}</span>
                                    </div>
                                )
                        })}
                    </div> : <div>У группы пока нет подписчиков...</div>}
                </div>

                {/*<div className="col-sm-6 mb-3">
                <div className="card h-100">
                    <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">
                            Project Status
                        </h6>
                    </div>
                </div>
            </div>*/}
            </div>
        )
}

export default GroupAdditionalInfoPage
