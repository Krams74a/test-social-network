import {Button, Row} from "react-bootstrap"
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {registration} from "../../reducers/auth-reducer";
import {Navigate} from "react-router";
import {Field, Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup"

const Register = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const nameRegex = /^[A-Za-z0-9]+$/;

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Обязательное поле').matches(nameRegex, "Только английские буквы"),
        password: Yup.string()
            .required('Обязательное поле')
            .min(4, 'Слишком короткий пароль')
            .max(25, 'Слишком длинный пароль'),
    });

    if (props.isAuth) {
        return <Navigate repalce to={"/profile"}/>
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <Formik initialValues={{username: '', password: '',}}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        props.registration(values.username, values.password)
                            .then(response => {
                                if(response.status === 200) {
                                    setSuccess(response.message)
                                } else {
                                    setError(response.message)
                                }
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
                        <div className="col-md-4" style={error || success ? {marginBottom: "1rem"} : {}}>
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
                            {success ? <div className="alert alert-success col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {success}.
                                <div>
                                    <NavLink className="alert-link" to={"/login"}>
                                        Необходимо войти
                                    </NavLink>
                                </div>
                            </div> : null}
                        </div>
                    </Row>
                    <div className="col-md-4">
                        <Button type="submit">Зарегистрироваться</Button>
                        <Row className="mb-3">
                            <span className="text-muted">
                                Есть аккаунт? <NavLink style={{textDecoration: "none"}}
                                                       to={'/login'}>Войти</NavLink>
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
        isAuth: state.auth.isAuth
    }
}

const RegisterContainer = connect(mapStateToProps, {registration})(Register)

export default RegisterContainer
