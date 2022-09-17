import {Button, Row} from "react-bootstrap"
import React, {useState} from "react";
import {Field, Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup"

const AddPost = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const SignupSchema = Yup.object().shape({
        content: Yup.string()
    })

    return (
        <div>
            <Formik initialValues={{content: '',}}
                    validationSchema={SignupSchema}
                    onSubmit={(values, {resetForm}) => {
                        console.log(values)
                        props.addPost(props.loggedUserInfo.username, values.title, values.content, props.postType, props.placeOfCreation)
                        resetForm({})
                    }}>
                <Form>
                    <Row className="mb-3">
                        <div className="col-md-10" style={error || success ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="content">Содержание</label>
                            <Field
                                as={"textarea"}
                                name="content"
                                className="form-control"
                                type="text"
                                placeholder="Чем вы хотите поделиться?"
                            />
                            <ErrorMessage component="div" name="content" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
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
