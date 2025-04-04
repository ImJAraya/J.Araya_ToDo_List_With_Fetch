import React, { useState, useEffect } from "react";


import Caja from "./Caja";
import Boton from "./Boton";


import "../../styles/index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {

    const [data, setData] = useState([])
    const [listaDeTareas, setListaDeTareas] = useState([])
    const [tarea, setTarea] = useState("")

    const handlerKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            setTarea(e.target.value)
            setTarea("")
            postData(e.target.value)
        }
    }

    const handlerClickIcono = (index) => {
        deleteData(listaDeTareas[index].id, index)
    }

    const postData = async (tarea) => {

        try {
            let response = await fetch("https://playground.4geeks.com/todo/todos/J.Araya"
                ,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "label": tarea,
                        "is_done": false
                    })
                }
            )
            if (!response.ok) {
                throw new Error("Algo salio mal")
            }
            let data = await response.json()
            setListaDeTareas(prev => [...prev, data])
        } catch (error) {
            console.error(error)
        }
    }

    const deleteData = async (id, index) => {
        try {
            let response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (!response.ok) {
                throw new Error("Algo salio mal")
            }
            const copiaListaDeTareas = listaDeTareas.filter((_, eliminar) => eliminar !== index)
            setListaDeTareas(copiaListaDeTareas)
        } catch (error) {
            console.error(error)
        }
    }

    const handlerClickEliminarBoton = () =>{
        deleteTodasLasPreguntas(data.name)
    }

    const deleteTodasLasPreguntas = async(nombreUsuario)=>{
        try {
            let response = await fetch(`https://playground.4geeks.com/todo/users/${nombreUsuario}`,
                {
                    method: "DELETE"
                })
            if(!response.ok){
                throw new Error("Algo salio mal al eliminar el usuario")
            }
            let response2 = await fetch(`https://playground.4geeks.com/todo/users/${nombreUsuario}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([])
                }
            )
            if (!response2.ok) {
                throw new Error("Algo salio mal al crear el usuario")
            }
            getData()
        } catch (error) {
            console.error(error)
        }
    }

    const getData = async () => {
        try {
            let response = await fetch("https://playground.4geeks.com/todo/users/J.Araya")
            if (!response.ok) {
                throw new Error("Algo salio mal")
            }
            let data = await response.json()
            setData(data)
            setListaDeTareas(data.todos)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()

    }, [])

    return (
        
        <div className="d-flex flex-column justify-content-center align-items-center fondo">
            <h1><strong>ToDo List</strong></h1>
            <div className=" d-flex flex-column gap-1">
                <input
                    value={tarea}
                    type="text"
                    placeholder="What needs to be done!?"
                    onChange={(e) => setTarea(e.target.value)}
                    onKeyDown={handlerKeyDown}
                />
                {listaDeTareas.length === 0 && <Caja mensaje="No hay tareas, añadir tareas" />}
                {listaDeTareas.map((element, index) => {
                    return <Caja key={index} mensaje={element.label} icono={<FontAwesomeIcon icon={faX} />} onClick={() => handlerClickIcono(index)} />
                })}
                <div style={{ fontSize: "10px" }}>
                    <p> Quedan {listaDeTareas.length} tareas</p>
                </div>
            </div>
            <Boton mensaje={"Eliminar todas las tareas"} onClick={handlerClickEliminarBoton}/>
        </div>
    )
}
export default Layout

