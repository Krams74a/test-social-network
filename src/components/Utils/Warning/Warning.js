import React from 'react';

const Warning = ({warningText}) => {
    return (
        <div className="alert alert-warning">
            {warningText}
        </div>
    );
};

export default Warning;
