import store from './store';

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

  get_graph_data() {
    $.ajax("https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=20", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log(resp.Data);
        store.dispatch({
          type: 'GRAPH',
          graph: resp.Data,
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
        console.log(resp.data.amount);
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
