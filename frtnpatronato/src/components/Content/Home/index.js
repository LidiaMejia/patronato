import React, {Component} from 'react';

//Importar Componentes
import Page from '../../Page';

export default class extends Component{
    constructor()
    {
        super(); //SIEMPRE VA
        this.state = { click:0 }; //Aqui se manejan los estados
        this.onClickButton = this.onClickButton.bind(this); //SIEMPRE SE HACE EL bind DE LOS EVENTOS QUE CREAMOS 
    }

    //AQUI VAN LOS MÉTODOS DE LOS EVENTOS
    onClickButton(e)
    {
        //Para modificar un estado se tiene que colocar setState() que tiene un JSON
        this.setState( {click: this.state.click + 1} );
    }

    render()
    {
        return(
            <Page
                title="Home"
                showHeader={true}
                showFooter={true}
            >
                {/* ESTO VA AL children */}
                <p>Lorem Ipsum Text Home</p>

                {/* En el Evento onClick se manda a llamar nuestra función */}
                <button onClick = {this.onClickButton}>SignIn</button>
                <p>Clicks: {this.state.click}</p>
            </Page>
        );
    }
}