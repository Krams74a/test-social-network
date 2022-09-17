import React from "react";
import {compose} from "redux";

const GroupLinksCard = ({website, github, twitter, instagram, facebook}) => {
    return (
        <div className="card mt-3" style={{backgroundColor: "#f3f3f3"}}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Website
                    </h6>
                    <a href={website} className="text-secondary">{website || "Отсутствует"}</a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Github
                    </h6>
                    <a href={github} className="text-secondary">{github || "Отсутствует"}</a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Twitter
                    </h6>
                    <a href={twitter} className="text-secondary">{twitter || "Отсутствует"}</a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Instagram
                    </h6>
                    <a href={instagram} className="text-secondary">{instagram || "Отсутствует"}</a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        Facebook
                    </h6>
                    <a href={facebook} className="text-secondary">{facebook || "Отсутствует"}</a>
                </li>
            </ul>
        </div>
    )
}

const GroupLinksCardContainer = compose()(GroupLinksCard)

export default GroupLinksCardContainer
