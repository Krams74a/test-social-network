import React from "react";
import {Card} from "react-bootstrap"

const Message = (props) => {
    return (
        <div>
            <Card style={{padding: "5px", marginBottom: "5px"}}>
                <Card.Title>
                    {props.author}
                </Card.Title>
                <Card.Body>
                    {props.content}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Message
