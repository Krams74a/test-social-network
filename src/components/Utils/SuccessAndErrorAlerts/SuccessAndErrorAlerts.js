import React from 'react';
import {NavLink} from "react-router-dom";

const SuccessAndErrorAlerts = ({error, success, username, groupName}) => {
    if (username) {
        return (
            <div style={{marginBottom: "5px"}}>
                {error &&
                <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {error}
                </div>
                }
                {success &&
                <div className="alert alert-success col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {success}.
                    <div>
                        <span>Можете вернуться к своей </span>
                        <NavLink className="alert-link" to={"/profile/"+username}>
                            странице.
                        </NavLink>
                    </div>
                </div>}
            </div>
        );
    }
    if (groupName) {
        return (
            <div style={{marginBottom: "5px"}}>
                {error &&
                <div className="alert alert-danger col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {error}
                </div>
                }
                {success &&
                <div className="alert alert-success col-md-4" style={{padding: "5px", marginBottom: "0"}}>
                    {success}.
                    <div>
                        <span>Можете вернуться к своей </span>
                        <NavLink className="alert-link" to={"/groups/"+groupName}>
                            группе.
                        </NavLink>
                    </div>
                </div>}
            </div>
        );
    }

};

export default SuccessAndErrorAlerts;
