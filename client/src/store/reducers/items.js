import * as actionTypes from "../actionTypes";




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
        showModal:false
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



  const setFlagForCart = (state, action) => {
    return updateObject(state, {showModal: action.showModal});
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