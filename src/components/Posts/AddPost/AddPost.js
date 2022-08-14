import {Button, Row} from "react-bootstrap"
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Field, Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup"

const AddPost = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const SignupSchema = Yup.object().shape({
        content: Yup.string()
            .required('Обязательное поле')
    })

    return (
        <div>
            <Formik initialValues={{content: '',}}
                    validationSchema={SignupSchema}
                    onSubmit={(values, {resetForm}) => {
                        props.addPost(props.loggedUserInfo.username, values.title, values.content)
                            .then(messageAndStatus => {
                                if(messageAndStatus.status === 200) {
                                    setSuccess(messageAndStatus.message)
                                    resetForm({})
                                } else {
                                    setError(messageAndStatus.message)
                                }
                            })
                    }}>
                <Form>
                    <Row className="mb-3">
                        <div className="col-md-6" style={error || success ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="content">Содержание</label>
                            <Field
                                name="content"
                                className="form-control"
                                type="text"
                                placeholder="Чем вы хотите поделиться?"
                            />
                            <ErrorMessage component="div" name="content" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
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
                        <Button type="submit">Опубликовать</Button>
                        <Row className="mb-3">
                        </Row>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddPost
