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

  update_user_details(data, id) {
    $.ajax("/api/v1/users/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        this.request_users();
        //store.dispatch({
        //  type: 'UPDATE_LOANS',
        //  loan: resp.loan,
        //});
      },
      error: (resp) => {
	console.log("update_user_details failure");
	console.log(resp);
      }
    });
  }

  request_user_wallet(user_id) {
    $.ajax("/api/v1/wallets/user/" + user_id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
	  type: 'WALLET_RESP',
 	  wallet: resp,
	});
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
        store.dispatch({
          type: 'CLEAR_LOGIN_FORM'
        });
      },
      error: (resp) => {
        console.log("error message", resp);
        store.dispatch({
          type: 'CLEAR_LOGIN_FORM'
        });
	store.dispatch({
	  type: 'ERROR',
	  msg: 'Incorrect username and/or password',
	});
      }
    });
  }

  submit_user(data) {
    let currentObj = this;
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
        console.log("data", data);
        let data1={email: data.email, pass: data.password};
        console.log("data1", data1);
        this.submit_login(data1);
      },
      error: (resp) => {
          //alert("PLEASE FILL ALL FIELDS AND TRY AGAIN!");
          store.dispatch({
            type: 'CLEAR_USER_FORM',
          });
          //console.log("ERROR LOG", resp.responseJSON);
          let msgs = Object.values(resp.responseJSON.errors);
          let msg = msgs.join(". ");
          store.dispatch({
	    type: 'ERROR',
	    msg: msg,
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

  get_litecoin() {
    $.ajax("https://api.coinbase.com/v2/prices/LTC-USD/spot", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'LITECOIN',
          litecoin: resp.data.amount,
        });
      },
    });
  }

  get_ethereum() {
    $.ajax("https://api.coinbase.com/v2/prices/ETH-USD/spot", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'EHTEREUM',
          ethereum: resp.data.amount,
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
        this.request_notifications();
      },
      error: (resp) => {
        console.log("error",resp);
        store.dispatch({
          type: 'CLEAR_NOTIFY_FORM',
        });
      }
    });
  }

  new_requestedloans(data) {
    $.ajax("/api/v1/requestedloans", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ requestedloan: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_REQUESTEDLOANS',
          requestedloan: resp.data,
        });
      },
      error: (resp) => {
        console.log(resp);
        store.dispatch({
          type: 'ERROR',
          msg: "Please fill all fields!",
        });
        alert("Please fill all fields!");
      }
    });
  }

  new_loans(data) {
    console.log("in new_loans");
    $.ajax("/api/v1/loans", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ loan: data }),
      success: (resp) => {
        console.log("new_loans success");
        store.dispatch({
          type: 'ADD_LOANS',
          loan: resp.data,
        });
      },
      error: (resp) => {
        console.log("new_loans failed");
        console.log(resp);
      }
    });
  }

  delete_notifications(data) {
    $.ajax("/api/v1/notification/" + data, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
      },
    });
  }

  update_notification(data, id) {
    $.ajax("/api/v1/notification/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ notification: data }),
      success: (resp) => {
        this.request_notifications();
      },
    });
}

   accept_loan(data, id) {
    $.ajax("/api/v1/loans/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ loan: data }),
      success: (resp) => {
	console.log("accept_loan success");
        this.request_loans();
        //store.dispatch({
        //  type: 'UPDATE_LOANS',
        //  loan: resp.loan,
        //});
      },
      error: (resp) => {
	console.log("accept_loan failure");
	console.log(resp);
      }
    });
  }

  grant_requestedloan(data, id) {
    $.ajax("/api/v1/requestedloans/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ requestedloan: data }),
      success: (resp) => {
	console.log("accept_loan success");
        this.request_requestedloans();
        //store.dispatch({
        //  type: 'UPDATE_LOANS',
        //  loan: resp.loan,
        //});
      },
      error: (resp) => {
	console.log("accept_loan failure");
	console.log(resp);
      }
    });
  }

  delete_loan(id) {
    $.ajax("/api/v1/loans/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
	console.log("delete_loan success");
        //store.dispatch({
        //  type: 'UPDATE_LOANS',
        //  loan: resp.loan,
        //});
      },
      error: (resp) => {
	console.log("delete_loan failure");
      }
    });
  }



}

export default new TheServer();
