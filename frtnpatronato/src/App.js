import React from 'react';
import { Route, Switch, BrowserRouter as BR } from 'react-router-dom'; //PARA EL SPA
// Ruta a utilizar en el navegador, Switch permite ver solo una a la vez, BR para manipular el browser

import './App.css';

//IMPORTAR PÁGINAS PARA MOSTRARLAS
//import Page from './components/Page';
import Home from './components/Content/Home';
import SignIn from './components/Content/SignIn';
import Votes from './components/Content/Votes';

function App() {
  return (
      <BR>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/signin" component={SignIn} exact/>
          <Route path="/votes" component={Votes} exact/>
        </Switch>
      </BR>
      // <Page 
      //   title = "Mi primera Página"
      //   showHeader = {true}
      //   showFooter = {true}
      // >
      //   <p>Lorem Ipsum</p> {/* ESTO VA AL children */}
      //   <button>SignIn</button>
      // </Page>
  );
}

export default App;
