import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const IncomingRequestCard = (props) => {
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

    const onApplyRequest = () => {
        props.applyIncomingRequest(props.request, props.loggedUsername)
    }

    const onCancelRequest = () => {
        props.cancelIncomingRequest(props.request, props.loggedUsername)
    }

    return (
        <Card style={{width: '25rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
            <Card.Body>
                <Card.Title>
                    <span>{"Отправитель: "}</span>
                    <span style={{cursor: "pointer", textDecoration: isHovering ? 'underline' : '', color: "#000000"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigateToUser(props.request)}>
                                        {" "+props.request}
                                    </span>
                </Card.Title>
                <Button style={{marginRight: "10px"}} onClick={onApplyRequest}>Принять заявку</Button>
                <Button variant={"danger"} onClick={onCancelRequest}>Отменить заявку</Button>
            </Card.Body>
        </Card>
    );
};

export default IncomingRequestCard;
