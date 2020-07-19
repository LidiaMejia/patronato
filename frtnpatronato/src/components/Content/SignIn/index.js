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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut imperdiet tellus. Quisque scelerisque vehicula tellus ac semper. Sed porta rhoncus laoreet. Ut ut cursus magna, id molestie orci. Vestibulum ultrices metus eu tellus vulputate ultricies. Praesent est ligula,
                    dapibus sed ex vitae, venenatis tristique nisi. Aenean vel metus et purus pharetra malesuada et sit amet elit. Suspendisse vel viverra nunc. Proin imperdiet sodales vulputate.</p>
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