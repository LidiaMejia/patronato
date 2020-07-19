import React, { Component } from 'react';


export default class extends Component
{
    constructor()
    {
        super();
        
        this.state = { selectedOption: '' }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    //METODOS
    onButtonClick(e)
    {   
        const {value} = e.target; //Guardar el valor clickeado (Propiedad value)
        console.log(value);
        this.setState( {...this.state, selectedOption:value} ); //Mostrarlo

        this.props.rsmHandler(value); //ENVIAR EL value DEL BOTÓN QUE SE DIÓ CLICK A INDEX PARA EL CONTADOR. Se coloca props.rsmHandler, no la función 
    }

    render()
    {
        //Obtener las Propiedades (props) enviadas por el de Orden Mayor ANTES DEL RETURN
        const {title} = this.props;

        //Vamos a hacer que aparezcan los botones si no se ha seleccionado ninguna opción, y cuando se le de click a alguna, aparecerá escrita
        // ¡¡¡¡¡¡¡¡¡SIEMPRE COLOCAR LOS EVENTOS DE PRIMERO!!!!!!!
        let data = (this.state.selectedOption == '')? 
                        (<section>
                            <button onClick={this.onButtonClick} name="botSi" value="Sí">Sí</button>
                            <button onClick={this.onButtonClick} name="botNo" value="No">No</button>
                            <button onClick={this.onButtonClick} name="botAbstener" value="Abstener">Abstener</button>
                        </section>) : (<strong>{this.state.selectedOption}</strong>);
        return (
            <section>
                <h3>{title}</h3>
                {data}
            </section>
        );
    }
}