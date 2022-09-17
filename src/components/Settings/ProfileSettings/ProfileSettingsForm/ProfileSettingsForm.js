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
import AvatarSettings from "../AvatarSettings/AvatarSettings";

const ProfileSettingsForm = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [show, setShow] = useState(false);

    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onUserDelete = (id) => {
        props.deleteUser(id)
        navigate('/login')
    }

    const id = props.loggedUserInfo.username
    useEffect(() => {
        props.getProfile(id)
    }, [id])

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Обязательное поле'),
        sex: Yup.string(),
        status: Yup.string(),
        address: Yup.string(),
        fullName: Yup.string(),
        birthday: Yup.string(),
        email: Yup.string(),
        phoneNumber: Yup.string(),
        website: Yup.string(),
        github: Yup.string(),
        twitter: Yup.string(),
        instagram: Yup.string(),
        facebook: Yup.string(),
        isPublic: Yup.boolean()
    });

    if (!props.profileInfo) return <Preloader />
    return (
        <div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление страницы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действительно хотите удалить свою страницу?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button variant="danger" onClick={() => onUserDelete(props.loggedUserInfo.id)}>
                            Удалить страницу
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <Row className="mb-3">
                {/*<AvatarSettings />*/}
                {/*<div className="col-md-4">
                    <label htmlFor="picture">Изменить аватар</label>
                    <input
                        name="picture"
                        className="form-control"
                        type="file"
                        onChange={onMainPhotoSelected}
                    />
                </div>*/}
            </Row>
            <div style={{marginTop: "5px"}}>
                {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {error}
                </div> : null}
                {success ? <div className="alert alert-success col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {success}.
                    <div>
                        <span>Можете вернуться к своей </span>
                        <NavLink className="alert-link" to={"/profile/"+props.loggedUserInfo.username}>
                            странице.
                        </NavLink>
                    </div>
                </div> : null}
            </div>
            <Formik initialValues={{username: props.profileInfo.username,
                sex: props.profileInfo.sex,
                status: props.profileInfo.status,
                address: props.profileInfo.address,
                fullName: props.profileInfo.fullName,
                birthday: props.profileInfo.birthday,
                email: props.profileInfo.email,
                phoneNumber: props.profileInfo.phoneNumber,
                website: props.profileInfo.website,
                github: props.profileInfo.github,
                twitter: props.profileInfo.twitter,
                instagram: props.profileInfo.instagram,
                facebook: props.profileInfo.facebook,
                isPublic: props.profileInfo.isPublic
            }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        values = {
                            ...values,
                            id: props.profileInfo._id
                        }
                        props.updateProfile(values)
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
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="status">Статус пользователя</label>
                            <Field
                                id="status"
                                name="status"
                                className="form-control"
                                type="text"
                                placeholder="Введите статус"
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
                            <label htmlFor="sex">Пол</label>
                            <Field className={"form-select"} as="select" name="sex">
                                <option className={"dropdown-item"} value="">Не указан</option>
                                <option className={"dropdown-item"} value="male">Мужской</option>
                                <option className={"dropdown-item"} value="female">Женский</option>
                            </Field>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="address">Адрес</label>
                            <Field
                                id="address"
                                name="address"
                                className="form-control"
                                type="text"
                                placeholder="Введите адрес"
                            />
                            <ErrorMessage component="div" name="address" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="fullName">Полное имя</label>
                            <Field
                                id="fullName"
                                name="fullName"
                                className="form-control"
                                type="text"
                                placeholder="Введите полное имя"
                            />
                            <ErrorMessage component="div" name="fullName" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="birthday">Дата рождения</label>
                            <Field
                                id="birthday"
                                name="birthday"
                                className="form-control"
                                type="date"
                                placeholder="Введите дату рождения"
                            />
                            <ErrorMessage component="div" name="birthday" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                className="form-control"
                                type="email"
                                placeholder="Введите Email"
                            />
                            <ErrorMessage component="div" name="email" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="phoneNumber">Номер телефона</label>
                            <Field
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control"
                                type="tel"
                                placeholder="Введите номер телефона"
                            />
                            <ErrorMessage component="div" name="phoneNumber" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="website">Ваш сайт</label>
                            <Field
                                id="website"
                                name="website"
                                className="form-control"
                                type="url"
                                placeholder="https://test.com"
                            />
                            <ErrorMessage component="div" name="website" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="github">GitHub</label>
                            <Field
                                id="github"
                                name="github"
                                className="form-control"
                                type="text"
                                placeholder="Введите ваш GitHub"
                            />
                            <ErrorMessage component="div" name="github" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="twitter">Twitter</label>
                            <Field
                                id="twitter"
                                name="twitter"
                                className="form-control"
                                type="text"
                                placeholder="Введите ваш Twitter"
                            />
                            <ErrorMessage component="div" name="twitter" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="instagram">Instagram</label>
                            <Field
                                id="instagram"
                                name="instagram"
                                className="form-control"
                                type="text"
                                placeholder="Введите ваш Instagram"
                            />
                            <ErrorMessage component="div" name="instagram" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4" style={error ? {marginBottom: "1rem"} : {}}>
                            <label htmlFor="facebook">Facebook</label>
                            <Field
                                id="facebook"
                                name="facebook"
                                className="form-control"
                                type="text"
                                placeholder="Введите ваш Facebook"
                            />
                            <ErrorMessage component="div" name="facebook" className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%"}}/>
                        </div>
                        <div style={{marginTop: "5px"}}>
                            {error ? <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {error}
                            </div> : null}
                            {success ? <div className="alert alert-success col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                                {success}.
                                <div>
                                    <span>Можете вернуться к своей </span>
                                    <NavLink className="alert-link" to={"/profile/"+props.loggedUserInfo.username}>
                                        странице.
                                    </NavLink>
                                </div>
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

export default ProfileSettingsForm;
