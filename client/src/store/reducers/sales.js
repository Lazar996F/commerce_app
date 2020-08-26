import * as actionTypes from "../actionTypes";


const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties,
    };
  };
  

  const initialState = {
        sales:[],
  };




  const reducer = (state = initialState, action) => {
    switch (action.type) {
     
      default:
        return state;
    }
  };
  
  export default reducer;