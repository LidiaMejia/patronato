import React, {Component} from 'react';
import Page from '../../Page';


export default class extends Component{
    constructor()
    {
        super();
        this.state = { email:'', password:'' };

        //TODO METODOD QUE HAGAMOS DEBE SER LIGADO A LA CLASE CON bind
        this.onTextChange = this.onTextChange.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
    }

    //METODOS
    //Cuando el usuario escriba viene aqui a guardar los datos
    onTextChange(e)
    {
        const {name, value} = e.target; //e.target rae los valores ingresados
        this.setState( {[name]:value} );
    }

    onClickButton(e)
    {
        alert(JSON.stringify(this.state)); //Mostrar los datos que ingreso el usuario convirtiendo a String
    }

    render()
    {
        return(
            <Page 
              title = "Crear Cuenta"
              showHeader = {true}
              showFooter = {true}
            >
              <fieldset>
                  <label for="email">Email: &nbsp;</label>
                  <input type="email" name="email" value={this.state.email} placeholder="tucorreo@gmail.com" onChange={this.onTextChange}/>
              </fieldset>
              <br/>
              <fieldset>
                  <label for="password">Contraseña: &nbsp;</label>
                    <input type="password" name="password" value={this.state.password} placeholder="Contraseña" onChange={this.onTextChange}/>
              </fieldset>
              <br/>
              <button onClick={this.onClickButton}>SignIn</button>
            </Page>
        );
    }
}