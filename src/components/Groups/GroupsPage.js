import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {createGroup, getGroupsList, setPagesInfo} from "../../reducers/groups-reducer";
import Preloader from "../Preloader/Preloader";
import Group from "./Group/Group";
import Paginator from "../Users/Paginator/Paginator";
import Warning from "../Utils/Warning/Warning";
import {Card} from "react-bootstrap";
import plusIcon from "../../assets/plus-icon.png";
import {useNavigate} from "react-router-dom";
import CreateGroupContainer from "./CreateGroup/CreateGroup";
import CreateGroup from "./CreateGroup/CreateGroup";

export function UsersPage(props) {
    const [showCreateGroup, setShowCreateGroup] = useState(false)

    useEffect(() => {
        props.getGroupsList(1, 10)
    }, [])

    const navigate = useNavigate()

    if (!props.groupsList && !props.pagesInfo.totalPages) return <Preloader />

    return (
        <div>
            <h1>Все группы</h1>
            {showCreateGroup && <CreateGroup loggedUserInfoUsername={props.loggedUserInfo.username} createGroup={props.createGroup} show={showCreateGroup} onHide={() => setShowCreateGroup(false)}/>}
            <div style={{cursor: "pointer"}} onClick={() => setShowCreateGroup(true)}>
                <Card style={{width: '25rem', marginBottom: "10px", backgroundColor: "#f3f3f3"}}>
                    <Card.Body>
                        <Card.Title>
                            <div style={{marginRight: "10px"}}>
                                <img src={plusIcon}/>
                            </div>
                            <span>
                                Создать новую группу
                            </span>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
            {props.pagesInfo.totalPages === 1 || <Paginator pagesInfo={props.pagesInfo} setPagesInfo={props.setPagesInfo} />}
            {[...props.groupsList].reverse().map((group, key) => {
                return <Group key={key} {...group} />
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        groupsList: state.groups.groupsList,
        isAuth: state.auth.isAuth,
        pagesInfo: state.groups.pagesInfo,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const UsersContainer = compose(
    connect(mapStateToProps, {getGroupsList, setPagesInfo, createGroup}),
    withAuthRedirect
)(UsersPage)

export default UsersContainer;
