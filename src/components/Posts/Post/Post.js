import React, {useState} from "react";
import {Button, Card, DropdownButton, Dropdown, ButtonGroup} from "react-bootstrap";
import {useNavigate} from "react-router";
import "./Post.css"
import AvatarPlaceholder from "../../../assets/avatar-placeholder.png";
import PostData from "./PostData/PostData";

export const Post = (props) => {
    const deletePostHandler = (id) => {
        props.deletePost(id)
    }

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

    const style = {
        position: "absolute",
        top: "5px",
        right: "5px"
    };

    return (
        <div>
            <Card style={{width: '30rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
                <Card.Body>
                    <Card.Title>
                        <div className={"card-title"}>
                            {
                                props.authorProfile.avatarUrl
                                    ? <img
                                           src={`https://dry-meadow-99203.herokuapp.com/${props.authorProfile.avatarUrl}`}
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
                                           className="rounded-circle" width="150" alt={"User"}/>
                            }
                            <div>
                                <div>
                                    <span style={{
                                        cursor: "pointer",
                                        textDecoration: isHovering ? 'underline' : '',
                                        color: "#000000"
                                    }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                          onClick={() => navigateToUser(props.author)}>
                                        {props.author}
                                    </span>
                                </div>
                                <PostData created={props.created}/>
                            </div>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {props.content}
                    </Card.Text>

                    {props.loggedUsername === props.author
                        ? <Dropdown style={style}>
                            <Dropdown.Toggle variant="outline-secondary" bsPrefix="test" style={{padding: "2px"}}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <g id="more_horizontal_24__Page-2" stroke="none" strokeWidth="1" fill="none"
                                       fillRule="evenodd">
                                        <g id="more_horizontal_24__more_horizontal_24">
                                            <path id="more_horizontal_24__Bounds" d="M24 0H0v24h24z"></path>
                                            <path
                                                d="M18 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm-6 4a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Zm-6 0a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Z"
                                                id="more_horizontal_24__Mask" fill="currentColor"></path>
                                        </g>
                                    </g>
                                </svg>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.loggedUsername === props.author
                                    ? <Dropdown.Item onClick={() => deletePostHandler(props.id)}>Удалить</Dropdown.Item>
                                    : null
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        : null
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default Post
