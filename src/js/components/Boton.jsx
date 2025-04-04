import React from "react"

const Boton =({mensaje, onClick})=>{


    return(
        <button type="button" className="btn btn-danger" onClick={onClick}>{mensaje}</button>
    )
}

export default Boton