import React from 'react';
import {Card, Col} from "react-bootstrap";
import AvatarPlaceholder from "../../../../../assets/avatar-placeholder.png";

const Preview = ({croppedAvatarUrl, preview, username}) => {
    return (
        <div>
            <h1>Предпросмотр</h1>
            <Card
                style={{width: '30rem', marginTop: "10px", backgroundColor: "#f3f3f3"}}>
                <Card.Body>
                    <Card.Title>
                        <div className={"card-title"}>
                            {
                                croppedAvatarUrl
                                    ? <img
                                        src={preview}
                                        onError={({currentTarget}) => {
                                            currentTarget.onerror = null
                                            currentTarget.src = AvatarPlaceholder;
                                        }}
                                        className="rounded-circle" width="150" alt={"User"}/>
                                    : <img src={AvatarPlaceholder}
                                           onError={({currentTarget}) => {
                                               currentTarget.onerror = null
                                               currentTarget.src = AvatarPlaceholder;
                                           }}
                                           className="rounded-circle" width="150"
                                           alt={"User"}/>
                            }
                        </div>
                        <div>
                            <div>
                                                    <span style={{cursor: "pointer", color: "#000000"}}>
                                                        {username}
                                                    </span>
                            </div>
                            <div className={"card-date"}>
                                                    <span>
                                                        5 июля
                                                    </span>
                            </div>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        Вот так будет выглядеть пост от вашего имени с данной аватаркой
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Preview;
