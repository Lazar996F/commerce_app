
import React, { Component } from 'react';
import {Container } from 'react-bootstrap'
import Bar from './components/navbar/navbar'
import Home from './components/shop/shop'
import './App.css';
import {createStore, applyMiddleware, combineReducers } from 'redux'
import itemsReducer from './store/reducers/items.js'
import salesReducer from './store/reducers/sales.js'
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
        <Bar/>
      </>
    ); 
  }
}

export default App;
