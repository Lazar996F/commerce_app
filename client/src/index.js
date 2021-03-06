import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Sales from "./components/sales/Sales";
import Add from "./components/add_item/add";
import DeleteItem from "./components/delete_item/deleteItem";
import Edit_item from "./components/Edit/edit_item";
import Cart from "./components/cart/cart";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import itemsReducer from "./store/reducers/items.js";
import salesReducer from "./store/reducers/sales.js";
import thunk from "redux-thunk";
import Shop from "./components/shop/shop";
import Home from "./components/home/home";

import storage from "redux-persist/lib/storage";
import { createMigrate, persistStore, persistReducer } from "redux-persist";

const migrations = {
  1: (state) => {
    return {
      ...state,
    };
  },
};

const persistConfig = {
  key: "root",
  storage: storage,
  migrate: createMigrate(migrations, { debug: false }),
};

const reducers = persistReducer(
  persistConfig,
  combineReducers({
    items: itemsReducer,
    sales: salesReducer,
  })
);

const store = createStore(reducers, applyMiddleware(thunk));
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Route path="/shop" exact component={Shop} />
        <Route path="/sales" component={Sales} />
        <Route path="/add/items" component={Add} />
        <Route path="/edit/items" component={Edit_item} />
        <Route path="/cart" component={Cart} />
        <Route path="/home" component={Home} />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
