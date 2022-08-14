import {Navbar, Container, Nav, Button} from "react-bootstrap"
import {NavLink, useNavigate} from "react-router-dom"
import {connect} from "react-redux";
import {logout} from "../../reducers/auth-reducer";
import "./Header.css"
import {Dropdown} from "react-bootstrap";
import React from "react";

const Header = (props) => {
    const navigate = useNavigate()


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{marginBottom: "15px"}}>
                <Container>
                    <Navbar.Brand as={NavLink} to={`/profile/${props.loggedUserInfo.username}`}>Test Network</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Button onClick={() => navigate(`/profile/${props.loggedUserInfo.username}`)}
                                    className='nav-link' style={{marginRight: "7px"}}>Профиль</Button>
                            <Button onClick={() => navigate('/posts')} className='nav-link'
                                    style={{marginRight: "7px"}}>Новости</Button>
                            <Button onClick={() => navigate('/users')} className='nav-link'
                                    style={{marginRight: "7px"}}>Пользователи</Button>
                            <Button onClick={() => navigate(`/friends/${props.loggedUserInfo.username}`)}
                                    className='nav-link' style={{marginRight: "7px"}}>Мои друзья</Button>
                        </Nav>
                        <Nav>
                            <Dropdown style={{marginRight: "5px"}}>
                                <Dropdown.Toggle bsPrefix="test">
                                    <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 2.1c4.02 0 6.9 3.28 6.9 7.53v1.6c0 .23.2.53.72 1.08l.27.27c1.08 1.1 1.51 1.73 1.51 2.75 0 .44-.05.79-.27 1.2-.45.88-1.42 1.37-2.87 1.37h-1.9c-.64 2.33-2.14 3.6-4.36 3.6-2.25 0-3.75-1.3-4.37-3.67l.02.07H5.74c-1.5 0-2.47-.5-2.9-1.41-.2-.4-.24-.72-.24-1.16 0-1.02.43-1.65 1.51-2.75l.27-.27c.53-.55.72-.85.72-1.08v-1.6C5.1 5.38 7.99 2.1 12 2.1zm2.47 15.8H9.53c.46 1.25 1.25 1.8 2.47 1.8s2.01-.55 2.47-1.8zM12 3.9c-2.96 0-5.1 2.43-5.1 5.73v1.6c0 .85-.39 1.46-1.23 2.33l-.28.29c-.75.75-.99 1.11-.99 1.48 0 .19.01.29.06.38.1.22.43.39 1.28.39h12.52c.82 0 1.16-.17 1.28-.4.05-.1.06-.2.06-.37 0-.37-.24-.73-.99-1.48l-.28-.29c-.84-.87-1.23-1.48-1.23-2.33v-1.6c0-3.3-2.13-5.73-5.1-5.73z"
                                            fill="currentColor"></path>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        У вас нет новых уведомлений...
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {props.isAuth ? <Button variant={"primary"} onClick={props.logout}>Выйти</Button> :
                                <Button onClick={() => navigate('/login')}>Логин</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const HeaderContainer = connect(mapStateToProps, {logout})(Header)

export default HeaderContainer
