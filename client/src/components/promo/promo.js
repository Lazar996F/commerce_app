
import React, { Component } from 'react';
import {Container } from 'react-bootstrap'
import Bar from './components/navbar96/navbar'
import Home from './components/home/home'
import './App.css';
import {createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';



const rootReducer = combineReducers({
  items: itemsReducer,
  sales: salesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))


class App extends Component {


  render() {

    return (
      <>
      
      </>
    ); 
  }
}

export default App;
