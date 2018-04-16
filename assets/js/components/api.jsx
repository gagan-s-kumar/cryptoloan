import store from './store';
import Cookies from 'universal-cookie';

class TheServer {

  request_loans() {
    $.ajax("/api/v1/loans", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'LOANS_LIST',
          loans: resp.data,
        });
      },
    });
  }

  request_notifications() {
    $.ajax("/api/v1/notification", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'NOTIFY_LIST',
          notifications: resp.data,
        });
      },
    });
  }

  request_requestedloans() {
    $.ajax("/api/v1/requestedloans", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'REQ_LIST',
          requestedloans: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          users: resp.data,
        });
      },
    });
  }

  request_user_wallet(user_id) {
    $.ajax("/api/v1/wallets/user/" + user_id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("no wallet response", resp);
      },
    });
  }

  request_wallets() {
    $.ajax("/api/v1/wallets", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'WALLET_LIST',
          wallets: resp.data,
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        const cookies = new Cookies();
        cookies.set('token', resp.token);
        cookies.set('user_id', resp.user_id);
	store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        console.log("error message", resp);
	store.dispatch({
	  type: 'ERROR',
	  msg: 'Incorrect username and/or password',
	});
      }
    });
  }

  submit_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
      },
    });
  }

  submit_logout() {
    console.log("in api");
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({}),
      success: (resp) => {
        const cookies = new Cookies();
        cookies.remove('token');
	cookies.remove('user_id');
        store.dispatch({
          type: 'RESET_TOKEN',
          token: resp,
        });
      },
    });
  }



  get_eth_graph_data() {
    $.ajax("https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=20", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'GRAPH',
          graph: {eth: resp.Data},
        });
      },
    });
  }


  get_btc_graph_data() {
    $.ajax("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=20", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'GRAPH',
          graph: {btc: resp.Data},
        });
      },
    });
  }


  get_ltc_graph_data() {
    $.ajax("https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=20", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'GRAPH',
          graph: {ltc: resp.Data},
        });
      },
    });
  }

  get_bitcoin() {
    $.ajax("https://api.coinbase.com/v2/prices/BTC-USD/spot", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'BITCOIN',
          bitcoin: resp.data.amount,
        });
      },
    });
  }


  new_notification(data) {
    $.ajax("/api/v1/notification", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ notification: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_NOTIFICATION',
          notification: resp.data,
        });
      },
      error: (resp) => {
        console.log(resp);
      }
    });
  }


}

export default new TheServer();
