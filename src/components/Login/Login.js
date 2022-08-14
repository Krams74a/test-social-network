import {Button, Row} from "react-bootstrap"
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../reducers/auth-reducer";
import {Navigate} from "react-router";
import {Field, Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup"


const Login = (props) => {
    const [error, setError] = useState("")

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Обязательное поле'),
        password: Yup.string()
            .required('Обязательное поле')
    });

    if (props.isAuth) {
        return <Navigate repalce to={"/profile/"+props.loggedUserInfo.username}/>
    }

    return (
        <div>
            <h1>Войти</h1>
            <Formik initialValues={{username: '', password: '',}}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        props.login(values.username, values.password)
                            .then(error => {
                                setError(error)
                            })
                    }}>
                <Form>
                    <Row className="mb-3">
                        <div className="col-md-4">
                            <label htmlFor="username">Логин</label>
                            <Field
                                name="username"
                                className="form-control"
                                type="text"
                                placeholder="Имя пользователя"
                            />
                            <ErrorMessage component="div" name="username" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="password">Пароль</label>
                            <Field
                                id="password"
                                name="password"
                                className="form-control"
                                type="password"
                                placeholder="Введите пароль"
                            />
                            <ErrorMessage component="div" name="password" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <div className="col-md-4">
                        <Button type="submit">Войти</Button>
                        <Row className="mb-3">
                            <span className="text-muted">
                                Нет аккаунта? <NavLink style={{textDecoration: "none"}}
                                                       to={'/register'}>Зарегистрироваться</NavLink>
                            </span>
                        </Row>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const LoginContainer = connect(mapStateToProps, {login})(Login)

export default LoginContainer
