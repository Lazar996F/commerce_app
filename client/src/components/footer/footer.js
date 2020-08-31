import itemsReducer from './store/reducers/items.js'
import salesReducer from './store/reducers/sales.js'

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  items: itemsReducer,
  sales: salesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))


class Footer extends Component {


  render() {

    return (
      <>
        <Bar/>
      </>
    ); 
  }
}

export default Footer;