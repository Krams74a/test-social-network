import React from "react";
import {Navigate} from "react-router-dom";
import Preloader from "../components/Preloader/Preloader";

export const withAuthorRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            console.log(this.props)
            if (this.props.groupProfileInfo) {
                if (this.props.loggedUserInfo.username !== this.props.groupProfileInfo.groupAuthor) return <Navigate to={`/groups/${this.props.groupProfileInfo.groupName}`} replace />
            }
            return <Component {...this.props} />
        }
    }
    return RedirectComponent
}
