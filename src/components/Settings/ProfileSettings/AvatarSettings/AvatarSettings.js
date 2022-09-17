import React, {useEffect, useState} from 'react'
import Avatar from 'react-avatar-edit'
import {Button, Card, Col, Dropdown, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteAvatar, getProfile, updateAvatar, uploadAvatar} from "../../../../reducers/profile-reducer";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import Preloader from "../../../Preloader/Preloader";
import AvatarPlaceholder from "../../../../assets/avatar-placeholder.png"
import {config} from "../../../../config/config";
import PostData from "../../../Posts/Post/PostData/PostData";
import Preview from "./Preview/Preview";
import SuccessAndErrorAlerts from "../../../Utils/SuccessAndErrorAlerts/SuccessAndErrorAlerts";

const AvatarSettings = (props) => {
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const onMainPhotoSelected = (event) => {
        if (event.target.files[0].size > 800000) {
            setError("Файл слишком большой")
        } else {
            if (event.target.files.length) {
                props.uploadAvatar(event.target.files[0], props.profileInfo._id)
                    .then(response => {
                        if (response.status === 200) {
                            setSuccess(response.message)
                            props.getProfile(props.loggedUserInfo.username)
                        } else {
                            setError(response.message)
                        }
                    })
            }
        }
    }

    const onMainPhotoDeleted = () => {
        setSuccess(null)
        props.deleteAvatar(props.profileInfo._id)
            .then(response => {
                if (response.status === 200) {
                    setSuccess(response.message)
                    props.getProfile(props.loggedUserInfo.username)
                } else {
                    setError(response.message)
                }
            })
    }

    useEffect(() => {
        props.getProfile(props.loggedUserInfo.username)
    }, [])

    const onClose = () => {
        onMainPhotoDeleted()
    }

    const onCrop = (preview) => {
        setPreview(preview)
    }

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    const saveAvatar = () => {
        setSuccess(null)
        let avatar = dataURLtoFile(preview, "avatar.png")
        props.updateAvatar(avatar, props.profileInfo._id)
            .then(response => {
                if (response.status === 200) {
                    setSuccess(response.message)
                    props.getProfile(props.loggedUserInfo.username)
                } else {
                    setError(response.message)
                }
            })
    }

    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 1600000) {
            setError("File is too big!")
            elem.target.value = ""
        }
    }

    return (
        <div>
            <h1>Настройки аватара</h1>
            <SuccessAndErrorAlerts success={success} error={error} username={props.profileInfo.username}/>

            {props.avatarUrl
                ? <div>
                    <Row style={{marginBottom: "15px"}}>
                        <Col>
                            <div>
                                <Avatar onBeforeFileLoad={onBeforeFileLoad} height={295} onCrop={onCrop}
                                        onClose={onClose} src={config.avatarUrl + props.profileInfo.avatarUrl}
                                        exportAsSquare={true}/>
                            </div>
                        </Col>
                        <Col>
                            <Preview croppedAvatarUrl={props.profileInfo.croppedAvatarUrl} username={props.profileInfo.username} preview={preview} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-md-4">
                            <Button onClick={saveAvatar} style={{marginRight: "10px"}}>Сохранить</Button>
                            <Button variant="danger" name="deletePicture" onClick={onMainPhotoDeleted}>Удалить аватар</Button>
                        </div>
                    </Row>
                </div>
                : <div className="col-md-4">
                    <div className={"alert alert-info"}>
                        <span>У вас ещё нет аватара, хотите добавить его?</span>
                    </div>
                    <label htmlFor="picture">Добавить аватар</label>
                    <input
                        name="picture"
                        className="form-control"
                        type="file"
                        onChange={onMainPhotoSelected}
                    />
                </div>
            }
            <div className="alert alert-warning" style={{marginTop: "20px"}}>
                Из-за того, что аватарки хранятся на бесплатном хостинге они спустя какое-то время удаляются. Поэтому периодически могут возникать проблемы с загрузкой новой аватарки. Для этого необходимо нажать на кнопку "Удалить аватар" и после уже загрузить ваш аватар заново.
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo,
        profileInfo: state.profile.profileInfo,
        avatarUrl: state.profile.profileInfo.avatarUrl
    }
}

const AvatarSettingsContainer = compose(
    connect(mapStateToProps, {getProfile, updateAvatar, deleteAvatar, uploadAvatar}),
    withAuthRedirect
)(AvatarSettings)

export default AvatarSettingsContainer;
