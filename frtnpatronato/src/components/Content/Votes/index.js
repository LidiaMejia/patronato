//Orden Mayor de VotingDeck. Se puede copiar el VotingDeck para reutilizarlo
//Va a controlar el estado del contador de Votos

import React, {Component} from 'react';
import Page from '../../Page';
import VotingDeck from './VotingDeck';


export default class extends Component
{
    constructor()
    {
        super();

        this.state = { contSí:0, contNo:0, contAbstener:0 }; //Contador para cada Voto. Lleva el nombre de su value en VotingDeck
        this.onClickVote = this.onClickVote.bind(this);
    }

    onClickVote(value) //Trae el value del boton que se da clic en VotingDeck
    {
        const voto = 'cont'+value; //Se arma el nombre del contador que se va a aumentar
        const cont = this.state[voto] + 1; //Se le suma 1 en este estado al contador respectivo
        this.setState( {...this.state, [voto]:cont} ); //Se agrega en el estado de contador correspondiente el nuevo valor del contador
    }

    render()
    {
        return(
            <Page
                title="Mociones para Votar"
                showHeader = {true}
                showFooter = {false}
            >
                {/* CUANDO SE MANDA UNA FUNCIÓN COLOCARLA DE PRIMERO Y UTILIZAR EL rsmHandler PARA PODER ENVIARLA Y USARLA EN EL OTRO COMPONENTE */}
                <VotingDeck rsmHandler={this.onClickVote} title="Reparación del Parque de Juegos"></VotingDeck>
                <VotingDeck rsmHandler={this.onClickVote} title="Colocación de Cámaras de Seguridad"></VotingDeck>
                <VotingDeck rsmHandler={this.onClickVote} title="Ampliación de opciones de pago para cuota mensual"></VotingDeck>

                <br />
                <section>
                    <p>Sí: {this.state.contSí}</p> 
                    <p>No: {this.state.contNo}</p>
                    <p>Abstener: {this.state.contAbstener}</p>
                </section>
            </Page>
        );
    }
}