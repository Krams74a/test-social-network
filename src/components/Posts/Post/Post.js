import React, {useState} from "react";
import {Button, Card, DropdownButton, Dropdown, ButtonGroup} from "react-bootstrap";
import {useNavigate} from "react-router";
import "./Post.css"
import AvatarPlaceholder from "../../../assets/avatar-placeholder.png";
import PostData from "./PostData/PostData";
import {config} from "../../../config/config";
import SmallAvatar from "../../Avatar/User/SmallAvatar/SmallAvatar";
import PostDropdown from "./PostDropdown/PostDropdown";
import HeartOutline from "../../../assets/like/heart-outline.png"
import HeartFilled from "../../../assets/like/heart-filled.png"
import LikeButton from "./LikeButton/LikeButton";

export const Post = (props) => {
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
        <div>
            <Card style={{width: '30rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
                <Card.Body>
                    <Card.Title>
                        <div className={"card-title"}>
                            <div style={{marginRight: "10px"}}>
                                <SmallAvatar avatarUrl={props.authorProfile.croppedAvatarUrl}/>
                            </div>
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
                        <p style={{whiteSpace: "pre-line"}}>{props.content}</p>
                    </Card.Text>
                    <PostDropdown {...props}/>
                    <Card.Footer style={{backgroundColor: "#f3f3f3", padding: "0px"}}>
                        <div style={{width: "23px", height: "23px", marginTop: "5px"}}>
                            <LikeButton {...props}/>
                        </div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Post
