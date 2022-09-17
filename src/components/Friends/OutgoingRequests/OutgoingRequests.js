import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const OutgoingRequests = (props) => {
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const navigate = useNavigate()
    const navigateToUser = (username) => {
        navigate("/profile/" + username)
    }
    return (
        <div>
            {props.friendsCandidates.map((request, key) => {
                if (!(request.recipient === props.loggedUserInfoUsername)) {
                    return(
                        <Card style={{width: '25rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}} key={key}>
                            <Card.Body>
                                <span>Отправитель: </span>
                                <span style={{cursor: "pointer", textDecoration: isHovering ? 'underline' : '', color: "#000000"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigateToUser(request.recipient)}>
                                {request.sender}
                            </span>
                            </Card.Body>
                        </Card>
                    )
                }
            })}
        </div>
    );
};

export default OutgoingRequests;
