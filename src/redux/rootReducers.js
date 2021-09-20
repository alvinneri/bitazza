import { combineReducers } from "redux";
import userReducer from './User/reducer'

const rootReducer = (state, action, history) => {
  const allReducers = combineReducers({
    user: userReducer
  });

  return allReducers(state, action);
};

export default rootReducer;
