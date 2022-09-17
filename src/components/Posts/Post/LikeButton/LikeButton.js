import React, {useEffect, useState} from 'react';
import HeartOutline from "../../../../assets/like/heart-outline.png";
import HeartFilled from "../../../../assets/like/heart-filled.png";
import {likePost} from "../../../../reducers/posts-reducer";

const LikeButton = (props) => {
    const onLike = () => {
        if (props.isLiked) {
            props.dislikePost(props.id, props.loggedUsername)
        } else {
            props.likePost(props.id, props.loggedUsername)
        }
    }
    return (
        <div style={{width: "100%", height: "100%", display: "flex"}}>
            <img src={props.isLiked ? HeartFilled : HeartOutline} style={{width: "100%", height: "100%", marginRight: "6px", cursor: "pointer"}} onClick={onLike}/>
            <span>{props.likesCount}</span>
        </div>
    );
};

export default LikeButton;
