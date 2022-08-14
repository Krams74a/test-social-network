import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap"
import {useNavigate} from "react-router";

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
        <Card style={{width: '25rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
            <Card.Body>
                    <div>
                        Отправитель: {props.sender}
                    </div>
                    <div>
                        Получатель: {props.recipient}
                    </div>
            </Card.Body>
        </Card>
    )
}

export default FriendCard;
