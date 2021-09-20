import { combineReducers } from "redux";
import userReducer from './User/reducer'
import publicReducer from './Public/reducer'

const rootReducer = (state, action, history) => {
  const allReducers = combineReducers({
    user: userReducer,
    public: publicReducer
  });

  return allReducers(state, action);
};

export default rootReducer;
