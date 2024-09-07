import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import axios from "axios";

const init = "init";
const increment = "increment";
const decrement = "decrement";
const incrementByAmount = "incrementByAmount";

const store = createStore(reducer, applyMiddleware(logger.default));

// async api
async function getUser() {
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  console.log(data);
}
getUser();
function reducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case decrement:
      return { amount: state.amount - 1 };
    case increment:
      return { amount: state.amount + 1 };
    case incrementByAmount:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

store.subscribe(() => {
  console.log(store.getState());
});

//action creators
function initUser(value) {
  return { type: init, payload: value };
}
function incrementFun() {
  return { type: increment };
}
function decrementFun() {
  return { type: decrement };
}
function incrementByAmountFun(value) {
  return { type: incrementByAmount, payload: value };
}

setInterval(() => {
  store.dispatch(initUser(500));
}, 2000);
