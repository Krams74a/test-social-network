import React, {Component} from "react";
import {addNewPost, addPost, deletePost, deletePostAction, getPosts} from "../../reducers/posts-reducer";
import {connect} from "react-redux";
import Post from "./Post/Post";
import AddPost from "./AddPost/AddPost";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export class PostsPage extends Component {
    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        if (!this.props.postsInfo) return <div>Loading...</div>
        return (
            <div>
                <h1>Посты других пользователей</h1>
                <AddPost addPost={this.props.addPost} addNewPost={this.props.addNewPost}
                         loggedUserInfo={this.props.loggedUserInfo}/>
                {[...this.props.postsInfo].reverse().map(post => <Post id={post._id} key={post._id} author={post.author}
                                                                       title={post.title}
                                                                       content={post.content} picture={post.picture}
                                                                       deletePost={this.props.deletePost}
                                                                       deletePostAction={this.props.deletePostAction}
                                                                       loggedUsername={this.props.loggedUserInfo.username}
                                                                       authorProfile={post.authorProfile}
                                                                       created={post.created}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postsInfo: state.posts.postsInfo,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const PostsContainer = compose(
    connect(mapStateToProps, {getPosts, addPost, deletePost, addNewPost, deletePostAction}),
    withAuthRedirect
)(PostsPage)

export default PostsContainer;
