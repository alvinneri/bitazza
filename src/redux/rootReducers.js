import { combineReducers } from "redux";
import userReducer from './User/reducer'
import publicReducer from './Public/reducer'
import instrumentsReducer from './Instruments/reducer'

const rootReducer = (state, action, history) => {
  const allReducers = combineReducers({
    user: userReducer,
    public: publicReducer,
    instruments: instrumentsReducer
  });

  return allReducers(state, action);
};

export default rootReducer;
