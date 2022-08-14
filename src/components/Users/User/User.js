import React, {useState} from "react";
import {Card, Badge} from "react-bootstrap";
import {useNavigate} from "react-router";

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
                        <span
                            style={{cursor: "pointer", textDecoration: isHovering ? 'underline' : ''}}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} onClick={() => navigateToUser(props.author)}>
                            {props.username}
                        </span>
                    </Card.Title>
                    <Card.Subtitle>{props.roles.map((role, id) => {
                        if (role === "ADMIN") {
                            return <Badge bg="primary" key={id}>{role}</Badge>
                        } else {
                            return <Badge bg="secondary" key={id}>{role}</Badge>
                        }
                    })}</Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default User
