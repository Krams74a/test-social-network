import {Spinner} from "react-bootstrap";

const Preloader = () => {
    return (
        <Spinner animation="border" role="status" style={{margin: "20px"}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Preloader;
