const initialState = {
  user: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_USER": {
      return {
        ...state,
        user: payload || null,
      };
    }

    default:
      return state;
  }
}
