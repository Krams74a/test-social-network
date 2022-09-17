import React from "react";

export const withPublicSettings = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            console.log(this.props)
            switch (this.props.profile.publicSettings) {
                case "All":
                    return <Component {...this.props} />
                case "Nobody":
                    if(this.props.website) {
                        return (
                            <div className="card mt-3" style={{backgroundColor: "#f3f3f3"}}>
                                <div className="card-body" style={{backgroundColor: "#f3f3f3"}}>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <h6 className="mb-0">Пользователь скрыл информацию о профиле</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="card mb-3" style={{backgroundColor: "#f3f3f3"}}>
                                <div className="card-body" style={{backgroundColor: "#f3f3f3"}}>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <h6 className="mb-0">Пользователь скрыл информацию о профиле</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                case "Friends":
                    if((this.props.profileFriends.filter(friend => friend.username === this.props.loggedUserInfoUsername).length > 0) || (this.props.profile.username === this.props.loggedUserInfoUsername)) {
                        return <Component {...this.props} />
                    }
                    if(this.props.website) {
                        return (
                            <div className="card mt-3" style={{backgroundColor: "#f3f3f3"}}>
                                <div className="card-body" style={{backgroundColor: "#f3f3f3"}}>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <h6 className="mb-0">Пользователь скрыл информацию о профиле</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="card mb-3" style={{backgroundColor: "#f3f3f3"}}>
                                <div className="card-body" style={{backgroundColor: "#f3f3f3"}}>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <h6 className="mb-0">Пользователь скрыл информацию о профиле</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    default:
                        return <Component {...this.props} />
            }
        }
    }

    return RedirectComponent
}
