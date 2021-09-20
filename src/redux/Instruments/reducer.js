  
  const initialState = {
    instruments: [],
    selectedInstrument: []
  };
  
  export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case 'SET_INSTRUMENTS': {
        return {
          ...state,
          instruments: payload.filter((item) => item.Product2Symbol === 'THB') || []
        };
      }
      case 'SET_SELECTED_INSTRUMENT': {
        return {
          ...state,
          selectedInstrument: state.instruments.filter((item) => item.InstrumentId === payload) || {}
        };
      }
    
      default:
        return state;
    }
  }
  