import React, {Component} from "react";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getUsers} from "../../reducers/users-reducer";
import User from "./User/User";

export class UsersPage extends Component {
    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        if (!this.props.usersList) return <div>Loading...</div>
        return (
            <div>
                <h1>Пользователи</h1>
                {[...this.props.usersList].reverse().map((user, key) => {
                    return <User profile={user.profile} id={key} key={key} username={user.username} roles={user.roles}/>})}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersList: state.users.usersList,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const UsersContainer = compose(
    connect(mapStateToProps, {getUsers}),
    withAuthRedirect
)(UsersPage)

export default UsersContainer;
