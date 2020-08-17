
import React, { Component } from 'react';
import Items from './components/items/items';
import { Container } from 'react-bootstrap'
import Navs from './components/navbar/navbar'
import './App.css';




class App extends Component {


  render() {

    return (
      <Container fluid>
        <Navs />
      </Container>
    );
    
  }
}

export default App;