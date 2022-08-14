import React from "react";
import {useNavigate} from "react-router-dom";

const UserInfoCard = ({loggedUserInfo, username, fullname, sex, birthday, email, phoneNumber, address, isPublic}) => {
    const navigate = useNavigate()

    const navigateToSettings = () => {
        navigate("/settings")
    }

    return (
        <div className="card mb-3" style={{backgroundColor: "#f3f3f3"}}>
            {isPublic || loggedUserInfo.username === username
                ?
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Полное имя</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {fullname || "Отсутствует"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Пол</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {!sex ? "Не указан" : sex === "male" ? "Мужской" : "Женский"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Дата рождения</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {birthday || "Отсутствует"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {email || "Отсутствует"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Телефон</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {phoneNumber || "Отсутствует"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Адрес</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {address || "Отсутствует"}
                        </div>
                    </div>
                    {
                        loggedUserInfo.username === username
                            ? <div className="row">
                                <div className="col-sm-12" style={{marginTop: "10px"}}>
                                    <button className="btn btn-primary" onClick={navigateToSettings}>Редактировать</button>
                                </div>
                            </div>
                            : null
                    }

                </div>
                :
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-10">
                            <h6 className="mb-0">Пользователь скрыл информацию о профиле</h6>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default UserInfoCard
