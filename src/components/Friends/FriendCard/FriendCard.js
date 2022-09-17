import React, {useState} from 'react';
import {Card} from "react-bootstrap"
import {useNavigate} from "react-router";
import SmallAvatar from "../../Avatar/User/SmallAvatar/SmallAvatar";

const FriendCard = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const navigate = useNavigate();

    const navigateToUser = (username) => {
        navigate("/profile/" + username)
    }

    return (
        <Card style={{width: '20rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
            <Card.Body>
                <Card.Title>
                    <div style={{marginRight: "10px"}}>
                        <SmallAvatar avatarUrl={props.avatarUrl} />
                    </div>
                    <div className={"card-title"}>
                        <span style={{cursor: "pointer", textDecoration: isHovering ? 'underline' : '', color: "#000000"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigateToUser(props.username)}>
                            {props.username}
                        </span>
                    </div>
                </Card.Title>
                <Card.Text>
                    {props.status || "Нет статуса"}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default FriendCard;
