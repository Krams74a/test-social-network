import React from 'react';
import {config} from "../../../../config/config";
import GroupAvatarPlaceholder from "../../../../assets/group-placeholder.png";

const GroupBigAvatar = ({avatarUrl}) => {
    return (
        <div>
            {
                avatarUrl
                    ? <img style={{height: "150px", width: "150px"}}
                           src={config.avatarUrl + avatarUrl}
                           onError={({currentTarget}) => {
                               currentTarget.onerror = null; // prevents looping
                               currentTarget.src = GroupAvatarPlaceholder;
                           }}
                           className="rounded-circle" width="150" alt={"User"}/>
                    : <img style={{height: "150px", width: "150px"}} src={GroupAvatarPlaceholder}
                           onError={({currentTarget}) => {
                               currentTarget.onerror = null; // prevents looping
                               currentTarget.src = GroupAvatarPlaceholder;
                           }}
                           className="rounded-circle" width="150" alt={"User"}/>
            }
        </div>
    );
};

export default GroupBigAvatar;
