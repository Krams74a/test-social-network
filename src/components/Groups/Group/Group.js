import React, {useState} from "react";
import {Card, Badge} from "react-bootstrap";
import {useNavigate} from "react-router";
import GroupSmallAvatar from "../../Avatar/Group/GroupSmallAvatar/GroupSmallAvatar";

export const User = (props) => {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false)

    const navigateToUser = (groupName) => {
        navigate("/groups/" + groupName)
    }

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div>
            <Card style={{width: '25rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
                <Card.Body>
                    <Card.Title>
                        <div style={{marginRight: "10px"}}>
                            <GroupSmallAvatar avatarUrl={props.groupCroppedAvatarUrl} />
                        </div>
                        <span
                            style={{cursor: "pointer", textDecoration: isHovering ? 'underline' : ''}}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} onClick={() => navigateToUser(props.groupName)}>
                            {props.groupName}
                        </span>
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default User
