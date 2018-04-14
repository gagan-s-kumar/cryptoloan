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

let empty_notify_form = {
  user_id: "",
  bclimit: "",
  lclimit: "",
  etlimit: "",
  alert_sent: ""
};

function notify_form(state = empty_notify_form, action) {
  switch (action.type) {
    case 'UPDATE_NOTIFY_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_NOTIFY_FORM':
      return empty_notify_form;
    default:
      return state;
  }
}

function notifications(state = [], action) {
  switch (action.type) {
  case 'NOTIFY_LIST':
    return [...action.notifications];
  case 'ADD_NOTIFICATION':
    return [action.notification, ...state];
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
  default:
    return state;
  }
}

function graph(state = [], action) {
  switch (action.type) {
  case 'GRAPH':
    return [...action.graph];
  default:
    return state;
  }
}

function bitcoin(state = [], action) {
  switch (action.type) {
  case 'BITCOIN':
    return [action.bitcoin];
  default:
    return state;
  }
}



function root_reducer(state0, action) {

  let reducer = combineReducers({loans, notifications, requestedloans, users, graph, bitcoin, notify_form});

  let state1 = reducer(state0, action);

  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store
