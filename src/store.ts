import { createStore, combineReducers } from "redux";


function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return state + 1;
    case "DECREMENT_COUNTER":
      return state - 1;
    default:
      return state
  }
}

const reducers = combineReducers({ count: counterReducer })

const store = createStore(reducers);


export type RootState = ReturnType<typeof store.getState>;
export default store;