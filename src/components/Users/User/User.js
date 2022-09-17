import React, {useState} from "react";
import {Card, Badge} from "react-bootstrap";
import {useNavigate} from "react-router";
import {config} from "../../../config/config";
import AvatarPlaceholder from "../../../assets/avatar-placeholder.png";
import SmallAvatar from "../../Avatar/User/SmallAvatar/SmallAvatar";

export const User = (props) => {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false)

    const navigateToUser = (username) => {
        navigate("/profile/" + username)
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
                    <Card.Title onClick={() => navigateToUser(props.username)}>
                        <div style={{marginRight: "10px"}}>
                            <SmallAvatar avatarUrl={props.profile.croppedAvatarUrl} />
                        </div>
                        <span
                            style={{cursor: "pointer", textDecoration: isHovering ? 'underline' : ''}}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} onClick={() => navigateToUser(props.author)}>
                            {props.username}
                        </span>
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default User
