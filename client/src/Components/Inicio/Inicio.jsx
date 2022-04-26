import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import './Inicio.css';


export default function Inicio () {
    return (
        <div id="fondo">
            <div id='todo'>
                <div className="frase">
                    <h1 className="titulo">Bienvenido a </h1> 
                    <h1 className="logo_inicio">Recipe Book!!!</h1>
                </div>
                
                <p className="texto">En "Recipe Book" encontraras una gran variedad de recetas recopiladas de la API
                spoonacular. También podrás crear tus recetas y compartirlas con el público. 
                Buen provecho!!!</p>
                
                <NavLink to='/Recipe_Book' className='boton'>
                    Inicio
                </NavLink>
            </div>
            
        </div>
    )

};