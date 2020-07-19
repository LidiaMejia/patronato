import React from 'react';
import {NavLink} from 'react-router-dom';

/* 
    Esta es una librería donde se crean los componentes para cada tipo de botón, con los parámetros requeridos por cada tipo de Botón,
    para luego solo llamarlos desde donde se necesiten. Los datos vienen de props.
*/

let buttonLibs = {};

//Botón Normal
buttonLibs.StandartBtn = (p)=>{
    let {caption, onclick, ...props} = p; //Obtener props

    //Se verifica si no vienen vacíos, y si es así se coloca un valor por defecto
    caption = (caption)? caption: "Click Me";
    onclick = (onclick)? onclick: ()=>{};

    return(
        <button onClick={onclick}>{caption}</button>
    );
}
 
//Botón de NavLink
buttonLibs.NavLinkBtn = (p)=>{
    let {children, toLink, className, ...props} = p; //Se puede agregar una clase para darle un estilo definido

    children = (children)? children: "Click Me"; //Texto o ícono
    toLink = (toLink)? toLink: "/"; //Hacia que página redirige
    className = (className)? "btn "+className: "btn primary"; //Estilo

    return (
        <NavLink to={toLink} className={className}>{children}</NavLink>
    );
}


//EXPORTAMOS CADA UNO DE LOS BOTONES PARA QUE PUEDAN SER ACCEDIDOS AL UTILIZAR buttonLibs
export const StandartBtn = buttonLibs.StandartBtn;
export const NavLinkBtn = buttonLibs.NavLinkBtn;

//SE EXPORTA EL ACCESO A buttonLibs
export default buttonLibs;
