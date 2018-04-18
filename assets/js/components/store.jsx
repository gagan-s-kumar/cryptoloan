import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

let empty_loans_form = {
  mini_balance: "",
  colletaral: "",
  accepted: "",
  requestedloan_id: "",
  user_id: ""
};

function loans_form(state = empty_loans_form, action) {
  switch (action.type) {
    case 'UPDATE_LOANS_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_LOANS_FORM':
      return empty_loans_form;
    default:
      return state;
  }
}

function loans(state = [], action) {
  switch (action.type) {
  case 'LOANS_LIST':
    return [...action.loans];
  case 'ADD_LOANS':
    return [action.loan, ...state];
  case 'UPDATE_LOANS':
    return [action.loan, ...state];
  case 'UPDATE_ACCEPTEDLOANS_FORM':
    return Object.assign({}, state, action.data);
  case 'CLEAR_ACCEPTEDLOANS_FORM':
    return empty_loans_form;
  default:
    return state;
  }
}

let empty_notify_form = {
  user_id: "",
  bclimit: "0",
  lclimit: "0",
  etlimit: "0",
};

let empty_clear_notify_form = {
  bclimit: "0",
  lclimit: "0",
  etlimit: "0",
};

function notify_form(state = empty_notify_form, action) {
  switch (action.type) {
    case 'UPDATE_NOTIFY_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_NOTIFY_FORM':
      return empty_notify_form;
    case 'CLEAR_EDIT_NOTIFY_FORM':
      return empty_clear_notify_form;
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

let empty_requestedloans_form = {
  user_id: "",
  amount: "",
  duration_requested: "",
  granted: ""
};

function requestedloans_form(state = empty_requestedloans_form, action) {
  switch (action.type) {
    case 'UPDATE_REQUESTEDLOANS_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_REQUESTEDLOANS_FORM':
      return empty_requestedloans_form;
    default:
      return state;
  }
}


function requestedloans(state = [], action) {
  switch (action.type) {
  case 'REQ_LIST':
    return [...action.requestedloans];
  case 'ADD_REQUESTEDLOANS':
    return [action.requestedloan, ...state];
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
  password_confirmation: "",
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
    case 'CLEAR_LOGIN_FORM':
      return empty_login;
    default:
      return state;
  }
}

function wallet(state=null, action) {
  if(action.type=='WALLET_RESP'){
    if(action.wallet){
      return action.wallet;
    }
    else
      return null;
  }
  else
    return state;
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

let reducer = combineReducers({loans, login, wallets, wallet,  user_form, token, notifications, requestedloans, users, graph, errors, notify_form, bitcoin, litecoin, ethereum, requestedloans_form, loans_form});

  let state1 = reducer(state0, action);

  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store
