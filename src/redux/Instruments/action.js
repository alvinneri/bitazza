export const setInstruments = (payload) => {
    return function (dispatch) {
        dispatch({ type: 'SET_INSTRUMENTS', payload: payload });
        };
};

export const setSelectedInstrument = (payload) => {
    return function (dispatch) {
        dispatch({ type: 'SET_SELECTED_INSTRUMENT', payload: payload });
        };   
}
  