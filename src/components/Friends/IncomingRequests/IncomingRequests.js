import React from 'react';
import IncomingRequestCard from "./IncomingRequestCard/IncomingRequestCard";

const IncomingRequests = (props) => {
    return (
        <div>
            {props.incomingRequests.length > 0 ? props.incomingRequests.map((request, key) => {
                    return(
                        <IncomingRequestCard key={key} request={request} applyIncomingRequest={props.applyIncomingRequest} cancelIncomingRequest={props.cancelIncomingRequest} loggedUsername={props.loggedUserInfoUsername}/>
                    )
                }) : <div>У вас пока нет заявок в друзья...</div>}

        </div>
    );
};

export default IncomingRequests;
