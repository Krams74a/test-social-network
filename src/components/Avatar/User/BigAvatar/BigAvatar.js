import React from 'react';
import {config} from "../../../../config/config";
import AvatarPlaceholder from "../../../../assets/avatar-placeholder.png";

const BigAvatar = ({avatarUrl}) => {
    return (
        <div>
            {
                avatarUrl
                    ? <img style={{height: "150px", width: "150px"}}
                           src={config.avatarUrl + avatarUrl}
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
        </div>
    );
};

export default BigAvatar;
