const initialState = {
  instruments: [],
  selectedInstrument: [],
  tickerHistories: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_INSTRUMENTS": {
      return {
        ...state,
        instruments:
          payload.filter((item) => item.Product2Symbol === "THB") || [],
      };
    }
    case "SET_SELECTED_INSTRUMENT": {
      return {
        ...state,
        selectedInstrument:
          state.instruments.filter((item) => item.InstrumentId === payload) ||
          {},
      };
    }
    case "SET_TICKER_HISTORIES": {
      const _newArray = [...state.instruments];
      const objIndex = _newArray.findIndex(
        (item) => item.InstrumentId === payload.id
      );
      _newArray[objIndex].percentChange = payload.percentChange;
      return {
        ...state,
        instruments: _newArray || [],
      };
    }

    default:
      return state;
  }
}
