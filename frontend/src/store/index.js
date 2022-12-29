import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bookingReducer from "./booking";
import mapsReducer from "./maps";
import reviewReducer from "./review";

// frontend/src/store/index.js
// ...
import sessionReducer from './session';
import spotReducer from "./spot";

// const rootReducer = combineReducers({

// });
// // ...

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spot: spotReducer,
  review: reviewReducer,
  booking: bookingReducer,
  maps: mapsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
