    export const setUser = (payload) => {
        return function (dispatch) {
            dispatch({ type: 'SET_USER', payload: payload });
            };
    };
  
  
  