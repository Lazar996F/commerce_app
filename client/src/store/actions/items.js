import * as actionTypes from '../actionTypes'





// I T E M S
export const getItemsSuccess = ( items ) => {
  return { items: items, error: {}, type: actionTypes.GET_ITEMS}
}


export const getItemsFail = ( err ) => {
  return { error: err, items: [],  type: actionTypes.GET_ITEMS}
}
export const getItems = payload => (dispatch) => {
    fetch('/api/items')
      .then(res => res.json())
      .then(items => dispatch(getItemsSuccess(items)))
      .catch(err => dispatch(getItemsFail(err)))
};


//I T E M_T Y P E S
export const getTypesSuccess = (itemTypes) => {
  return {types:itemTypes, error: {}, type: actionTypes.GET_ITEM_TYPES}
}


export const getTypesFail = (err) => {
  return {error:err, itemTypes: [] , type: actionTypes.GET_ITEM_TYPES}
}


export const getTypes = payload => (dispatch) => {
      fetch('/api/types')
      .then(res => res.json())
      .then(types => dispatch(getTypesSuccess(types)))
      .catch(err => dispatch(getTypesFail(err)))
};


// ITEMS FOR CART and FOR NAVBAR ICON(cart)
export const setCart = payload => {
    return {cart:payload, type: actionTypes.SET_CART}
};


