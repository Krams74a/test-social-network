import React from "react";
import BigAvatar from "../../../Avatar/User/BigAvatar/BigAvatar";

const LoggedUserAvatarCard = ({avatar, username, status, address}) => {
    return (
        <div className="card" style={{backgroundColor: "#f3f3f3"}}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <BigAvatar avatarUrl={avatar}/>
                    <div className="mt-3">
                        <h4>{username}</h4>
                        <p className="text-secondary mb-1">{status || "Отсутствует"}</p>
                        <p className="text-muted font-size-sm">{address || "Отсутствует"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoggedUserAvatarCard
