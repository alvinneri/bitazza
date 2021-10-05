export const setInstruments = (payload) => {
  return function (dispatch) {
    dispatch({ type: "SET_INSTRUMENTS", payload: payload });
  };
};

export const setSelectedInstrument = (payload) => {
  return function (dispatch) {
    dispatch({ type: "SET_SELECTED_INSTRUMENT", payload: payload });
  };
};

export const setTickerHistories = (payload) => {
  return function (dispatch) {
    dispatch({ type: "SET_TICKER_HISTORIES", payload: payload });
  };
};
