import React from 'react';
import {Dropdown} from "react-bootstrap";

const PostDropdown = (props) => {
    const deletePostHandler = (id) => {
        console.log(id)
        props.deletePost(id)
    }

    const style = {
        position: "absolute",
        top: "5px",
        right: "5px",
        border: "none"
    };

    return (
        <div>
            {props.loggedUsername === props.author
                ? <Dropdown style={style}>
                    <Dropdown.Toggle variant="outline-secondary" bsPrefix="test" style={{padding: "2px", border: "none"}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="more_horizontal_24__Page-2" stroke="none" strokeWidth="1" fill="none"
                               fillRule="evenodd">
                                <g id="more_horizontal_24__more_horizontal_24">
                                    <path id="more_horizontal_24__Bounds" d="M24 0H0v24h24z"></path>
                                    <path
                                        d="M18 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm-6 4a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Zm-6 0a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Z"
                                        id="more_horizontal_24__Mask" fill="currentColor"></path>
                                </g>
                            </g>
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {props.loggedUsername === props.author
                            ? <Dropdown.Item onClick={() => deletePostHandler(props.id)}>Удалить</Dropdown.Item>
                            : null
                        }
                    </Dropdown.Menu>
                </Dropdown>
                : null
            }
        </div>
    );
};

export default PostDropdown;
