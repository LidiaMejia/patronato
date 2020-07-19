import React from 'react';
import logo from './logo.svg';
import './App.css';

//IMPORTAR PÁGINAS PARA MOSTRARLAS
//import Page from './components/Page';
//import Home from './components/Content/Home';
//import SignIn from './components/Content/SignIn';
import Votes from './components/Content/Votes';

function App() {
  return (
      <Votes></Votes>
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
