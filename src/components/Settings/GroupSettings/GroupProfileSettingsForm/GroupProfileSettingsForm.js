import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Modal, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import Preloader from "../../../Preloader/Preloader";
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteAvatar, getProfile, updateAvatar, updateProfile} from "../../../../reducers/profile-reducer";
import {deleteUser} from "../../../../reducers/users-reducer";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import Avatar from "react-avatar-edit";
import AvatarSettings from "../GroupAvatarSettings/GroupAvatarSettings";

const GroupProfileSettingsForm = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [show, setShow] = useState(false);
    /*const nameRegex = /^[A-Za-z0-9]+$/;*/
    const nameRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)+(?: [a-zA-Z0-9]+)?$/;


    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onGroupDelete = (id) => {
        props.deleteGroup(id)
        navigate('/groups')
    }

    const SignupSchema = Yup.object().shape({
        groupName: Yup.string()
            .required('Обязательное поле').matches(nameRegex, "Только английские буквы"),
        description: Yup.string()
    });

    if (!props.groupProfileInfo) return <Preloader />
    return (
        <div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление группы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действительно хотите удалить свою группу?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button variant="danger" onClick={() => onGroupDelete(props.groupProfileInfo.groupName)}>
                            Удалить группу
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <div style={{marginTop: "5px"}}>
                {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {error}
                </div> : null}
                {success ? <div className="alert alert-success col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {success}.
                    <div>
                        <span>Можете вернуться к своей </span>
                        <NavLink className="alert-link" to={"/groups/"+props.groupProfileInfo.groupName}>
                            группе.
                        </NavLink>
                    </div>
                </div> : null}
            </div>
            <Formik initialValues={{groupName: props.groupProfileInfo.groupName, groupDescription: props.groupProfileInfo.groupDescription}}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        values = {
                            ...values,
                            groupAuthor: props.groupProfileInfo.groupAuthor
                        }
                        console.log(values)
                        props.updateGroupProfile(values, props.groupProfileInfo.groupName)
                            .then(response => {
                                console.log(response)
                                if(response.status === 200) {
                                    setSuccess(response.message)
                                    navigate(`/settings/group/${values.groupName}`)
                                } else {
                                    setError(response.message)
                                }
                            })
                    }}>
                <Form>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="groupName">Название группы</label>
                            <Field
                                id="groupName"
                                name="groupName"
                                className="form-control"
                                type="text"
                                placeholder="Название вашей группы"
                            />
                            <ErrorMessage component="div" name="status" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="groupDescription">Описание</label>
                            <Field
                                as={"textarea"}
                                id="groupDescription"
                                name="groupDescription"
                                className="form-control"
                                type="text"
                                placeholder="Описание группы"
                            />
                            <ErrorMessage component="div" name="address" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <div className="col-md-4">
                        <Button type="submit" style={{marginBottom: "10px"}}>Сохранить</Button>
                    </div>
                    <div className="col-md-4">
                        <Button variant="danger" style={{marginBottom: "10px"}} onClick={handleShow}>Удалить страницу</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
};

export default GroupProfileSettingsForm;
