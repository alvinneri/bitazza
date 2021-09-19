import { combineReducers } from "redux";

const rootReducer = (state, action, history) => {
  const allReducers = combineReducers({});

  return allReducers(state, action);
};

export default rootReducer;
