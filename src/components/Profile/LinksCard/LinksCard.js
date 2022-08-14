import React from "react";

const LinksCard = ({website, github, twitter, instagram, facebook, isPublic, loggedUserInfo, username}) => {
    return (
        <div className="card mt-3" style={{backgroundColor: "#f3f3f3"}}>
            {isPublic || loggedUserInfo.username === username ?
                <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Website
                    </h6>
                    <span className="text-secondary">{website || "Отсутствует"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Github
                    </h6>
                    <span className="text-secondary">{github || "Отсутствует"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Twitter
                    </h6>
                    <span className="text-secondary">{twitter || "Отсутствует"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Instagram
                    </h6>
                    <span className="text-secondary">{instagram || "Отсутствует"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Facebook
                    </h6>
                    <span className="text-secondary">{facebook || "Отсутствует"}</span>
                </li>
            </ul>: <div className="card-body" style={{backgroundColor: "#f3f3f3"}}>Пользователь скрыл информацию о профиле</div>}
            </div>
    )
}

export default LinksCard
