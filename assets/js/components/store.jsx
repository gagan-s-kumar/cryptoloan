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

function wallets(state = [], action) {
  switch (action.type) {
    case 'WALLET_LIST':
      return [...action.wallets];
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

function bitcoin(state = [], action) {
  switch (action.type) {
  case 'BITCOIN':
    return [action.bitcoin];
  default:
    return state;
  }
}

function litecoin(state = [], action) {
  switch (action.type) {
  case 'LITECOIN':
    return [action.litecoin];
  default:
    return state;
  }
}

function ethereum(state = [], action) {
  switch (action.type) {
  case 'EHTEREUM':
    return [action.ethereum];
  default:
    return state;
  }
}

function root_reducer(state0, action) {

  let reducer = combineReducers({loans, login, wallets,  user_form, token, notifications, requestedloans, users, graph, errors, notify_form, bitcoin, litecoin, ethereum});

  let state1 = reducer(state0, action);

  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store

