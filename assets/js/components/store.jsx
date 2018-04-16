import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function loans(state = [], action) {
  switch (action.type) {
  case 'LOANS_LIST':
    return [...action.loans];
  default:
    return state;
  }
}

function notifications(state = [], action) {
  switch (action.type) {
  case 'NOTIFY_LIST':
    return [...action.notifications];
  default:
    return state;
  }
}

function requestedloans(state = [], action) {
  switch (action.type) {
  case 'REQ_LIST':
    return [...action.requestedloans];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'RESET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_user_form = {
  name: "",
  email: "",
  password: "",
};

function user_form(state=empty_user_form, action) {
  switch (action.type) {
    case 'UPDATE_USER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_USER_FORM':
      return empty_user_form;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function graph(state = [], action) {
  console.log("IN STORE", action)
  switch (action.type) {
  case 'GRAPH':
    return [action.graph, ...state];
  default:
    return state;
  }
}

function errors(state="", action) {
  switch (action.type) {
    case 'ERROR':
      return action.msg;
    default:
      return "";
  }
}

function root_reducer(state0, action) {

  let reducer = combineReducers({loans, login, user_form, token, notifications, requestedloans, users, graph, errors});

  let state1 = reducer(state0, action);

  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store
