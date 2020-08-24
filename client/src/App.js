
import React, { Component } from 'react';
import {Container } from 'react-bootstrap'
import Bar from './components/navbar96/navbar'
import Home from './components/home/home'
import './App.css';

class App extends Component {
  
  render() {

    return (
      <Container fluid>
        <Bar/>
        <Home/>
      </Container>
    ); 
  }
}

export default App;
