import * as actionTypes from '../actionTypes'





export const getBSsucces = ( items ) => {
    return { items: items, error: {}, type: actionTypes.GET_ITEMS}
  }
  
  
  export const getBSfail = ( err ) => {
    return { error: err, items: [],  type: actionTypes.GET_ITEMS}
  }
  
  export const getBestSeller = payload => (dispatch) => {
      fetch('/api/items')
        .then(res => res.json())
        .then(items => dispatch(getItemsSuccess(items)))
        .catch(err => dispatch(getItemsFail(err)))
  };