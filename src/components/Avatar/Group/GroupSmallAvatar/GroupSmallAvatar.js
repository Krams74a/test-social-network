import React from 'react';
import {config} from "../../../../config/config";
import GroupAvatarPlaceholder from "../../../../assets/group-placeholder.png";

const GroupSmallAvatar = ({avatarUrl}) => {
    return (
        <div style={{width: "50px", height: "50px"}}>
            {
                avatarUrl
                    ? <img style={{width: "50px", height: "50px"}}
                        src={config.avatarUrl+avatarUrl}
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null
                            currentTarget.src = GroupAvatarPlaceholder;
                        }}
                        className="rounded-circle" width="150" alt={"User"}/>
                    : <img style={{width: "50px", height: "50px"}} src={GroupAvatarPlaceholder}
                           onError={({currentTarget}) => {
                               currentTarget.onerror = null
                               currentTarget.src = GroupAvatarPlaceholder;
                           }}
                           className="rounded-circle" width="150" alt={"User"}/>
            }
        </div>
    );
};

export default GroupSmallAvatar;
