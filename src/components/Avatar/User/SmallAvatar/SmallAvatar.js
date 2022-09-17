import React from 'react';
import {config} from "../../../../config/config";
import AvatarPlaceholder from "../../../../assets/avatar-placeholder.png";

const SmallAvatar = ({avatarUrl}) => {
    return (
        <div style={{width: "50px", height: "50px"}}>
            {
                avatarUrl
                    ? <img style={{width: "50px", height: "50px"}}
                        src={config.avatarUrl+avatarUrl}
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null
                            currentTarget.src = AvatarPlaceholder;
                        }}
                        className="rounded-circle" width="150" alt={"User"}/>
                    : <img style={{width: "50px", height: "50px"}} src={AvatarPlaceholder}
                           onError={({currentTarget}) => {
                               currentTarget.onerror = null
                               currentTarget.src = AvatarPlaceholder;
                           }}
                           className="rounded-circle" width="150" alt={"User"}/>
            }
        </div>
    );
};

export default SmallAvatar;
