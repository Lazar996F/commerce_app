import * as actionTypes from "../actionTypes";
import { postToSold } from "../actions/items";



const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties,
    };
  };
  

  const initialState = {
        itemsRedux:[],
        itemTypes:[],
        error: {},
        addedToCart:[],
  };


  const getItems = (state, action) => {
    return updateObject(state, { itemsRedux: action.items, error: action.error });
  };


  const getTypes = (state, action) => {
    return updateObject(state, { itemTypes: action.types});
  };

  const setCart = (state, action) => {
    return updateObject(state, { addedToCart: [...action.cart] });
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_ITEMS:
        return getItems(state, action);
    case actionTypes.GET_ITEM_TYPES:
        return getTypes(state, action);
     case actionTypes.SET_CART:
       return setCart(state,action);
      default:
        return state;
    }
  };


 
  
  export default reducer;