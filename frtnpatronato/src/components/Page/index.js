import React from 'react';  

//Importar componentes
import Header from '../Header';
import Footer from '../Footer';

//Componente Funcional
export default ({showHeader, showFooter, title, children})=>{
    //LLamar los componentes
    const MyHeader = (showHeader)? (<Header title = {title}></Header>): null;
    const MyFooter = (showFooter)? (<Footer></Footer>): null;

    return(
        <section>
            {MyHeader}

            <main>
                {children} {/*children obtiene todo lo que no es propiedad (Lo que va dentro de las etiquetas) */}
            </main>

            {MyFooter}
        </section>
    )
}