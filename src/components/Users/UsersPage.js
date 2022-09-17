import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getUsers} from "../../reducers/users-reducer";
import User from "./User/User";
import {setPagesInfo} from "../../reducers/users-reducer";
import Paginator from "./Paginator/Paginator";

export function UsersPage(props) {
    useEffect(() => {
        props.getUsers(props.pagesInfo.page, 10)
    }, [props.pagesInfo.page])

    if (!props.usersList || !props.pagesInfo.totalPages) return <div>Loading...</div>
    return (
        <div>
            <h1>Пользователи</h1>
            {props.pagesInfo.totalPages === 1 || <Paginator pagesInfo={props.pagesInfo} setPagesInfo={props.setPagesInfo} />}
            {[...props.usersList].reverse().map((user, key) => {
                return <User profile={user.profile} id={key} key={key} username={user.username} roles={user.roles}/>
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        usersList: state.users.usersList,
        pagesInfo: state.users.pagesInfo,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const UsersContainer = compose(
    connect(mapStateToProps, {getUsers, setPagesInfo}),
    withAuthRedirect
)(UsersPage)

export default UsersContainer;
