import React from "react";
import "../../styles/index.css"

const Caja = ({ mensaje, icono, onClick }) => {

    return (
        <div className="card contenedor d-flex align-items-center" style={{ width: "300px" }}>
            <div className="d-flex justify-content-between align-items-center w-100 p-3">
                <p className="m-0 texto-wrap">{mensaje}</p>
                <i className="icono" onClick={onClick}>{icono}</i>
            </div>
        </div>
    );
};



export default Caja