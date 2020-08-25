import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Items from './components/items/items'
import Sales from './components/sales/Sales'
import Add from './components/add_item/add'
import DeleteItem from './components/delete_item/deleteItem'
import Edit_item from './components/Edit/edit_item'



ReactDOM.render(
  <React.StrictMode>
      <Router>
        <App />
          <Route  path="/items" component={Items} />
          <Route path="/sales" component={Sales} />
          <Route path="/add" component={Add}/>
          <Route path="/delete" component={DeleteItem}/>
          <Route path="/edit" component={Edit_item}/>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
