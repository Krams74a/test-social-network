import React from 'react';
import Post from "../../../../Posts/Post/Post";

const LoggedUserPosts = (props) => {
    return (
        <div>
            {[...props.loggedUserPosts].reverse().map(post => {
                return (
                    <Post id={post._id} key={post._id} author={post.author}
                          title={post.title} likesCount={post.likesCount}
                          content={post.content} picture={post.picture}
                          deletePost={props.deletePost}
                          deletePostAction={props.deletePostAction}
                          loggedUsername={props.loggedUserInfo.username}
                          authorProfile={post.authorProfile}
                          created={post.created} likePost={props.likePost} dislikePost={props.dislikePost}
                          likedUsers={post.likedUsers} isLiked={post.isLiked} postType={post.postType}/>
                )
            })}
        </div>
    );
};

export default LoggedUserPosts;
