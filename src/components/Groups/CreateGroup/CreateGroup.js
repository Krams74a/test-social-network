import React, {useState} from 'react';
import {Button, Row} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {NavLink} from "react-router-dom";
import * as Yup from "yup";

const CreateGroup = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const nameRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)?$/;;

    const SignupSchema = Yup.object().shape({
        groupName: Yup.string()
            .required('Обязательное поле').matches(nameRegex, "Только английские буквы"),
    })

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Создание группы
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={{groupName: '',}}
                            validationSchema={SignupSchema}
                            onSubmit={(values, {resetForm}) => {
                                console.log(values)
                                props.createGroup({groupAuthor: props.loggedUserInfoUsername, groupName: values.groupName, membersList: [props.loggedUserInfoUsername]})
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
                                    <label htmlFor="groupName">Название группы</label>
                                    <Field
                                        name="groupName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Введите название вашей группы"
                                    />
                                    <ErrorMessage component="div" name="content" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                                </div>
                            </Row>
                            <div className="col-md-4">
                                <Button type="submit">Создать группу</Button>
                            </div>
                        </Form>
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateGroup;
