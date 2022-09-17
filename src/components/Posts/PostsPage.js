import React, {useEffect} from "react";
import {
    addNewPost,
    addPost,
    deletePost,
    deletePostAction,
    dislikePost,
    getPosts,
    likePost
} from "../../reducers/posts-reducer";
import {connect} from "react-redux";
import Post from "./Post/Post";
import AddPost from "../Utils/AddPost/AddPost";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export function PostsPage(props) {
    useEffect(() => {
        props.getPosts(props.loggedUserInfo.username)
    }, [])

    if (!props.postsInfo) return <div>Loading...</div>
    return (
        <div>
            <h1>Посты других пользователей</h1>
            <AddPost addPost={props.addPost} loggedUserInfo={props.loggedUserInfo} postType={"General"} placeOfCreation={"General"}/>
            {[...props.postsInfo].reverse().map(post => <Post id={post._id} key={post._id} author={post.author}
                                                              title={post.title} likesCount={post.likesCount}
                                                              content={post.content} picture={post.picture}
                                                              deletePost={props.deletePost}
                                                              deletePostAction={props.deletePostAction}
                                                              loggedUsername={props.loggedUserInfo.username}
                                                              authorProfile={post.authorProfile}
                                                              created={post.created} postType={post.postType} likePost={props.likePost} dislikePost={props.dislikePost} likedUsers={post.likedUsers} isLiked={post.isLiked}/>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        postsInfo: state.posts.postsInfo,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const PostsContainer = compose(
    connect(mapStateToProps, {getPosts, addPost, deletePost, addNewPost, deletePostAction, likePost, dislikePost}),
    withAuthRedirect
)(PostsPage)

export default PostsContainer;
