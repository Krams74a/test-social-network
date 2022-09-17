import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {Button, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import * as Yup from "yup";
import Preloader from "../../../Preloader/Preloader";
import SuccessAndErrorAlerts from "../../../Utils/SuccessAndErrorAlerts/SuccessAndErrorAlerts";

const PrivateSettingsForm = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

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
        publicSettings: Yup.string()
    });

    if (!props.profileInfo) return <Preloader />
    return (
        <div>
            <Formik initialValues={{
                username: props.profileInfo.username,
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
                publicSettings: props.profileInfo.publicSettings
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
                            <label htmlFor="publicSettings">Кто может видеть информацию на вашей странице?</label>
                            <Field className={"form-select"} as="select" name="publicSettings">
                                <option className={"dropdown-item"} value={"All"}>Все</option>
                                <option className={"dropdown-item"} value={"Nobody"}>Никто</option>
                                <option className={"dropdown-item"} value={"Friends"}>Только друзья</option>
                            </Field>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <SuccessAndErrorAlerts error={error} success={success} username={props.profileInfo.username} />
                    </Row>
                    <div className="col-md-4">
                        <Button type="submit" style={{marginBottom: "10px"}}>Сохранить</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
};

export default PrivateSettingsForm;
