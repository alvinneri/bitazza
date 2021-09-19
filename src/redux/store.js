import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = composeWithDevTools;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
