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

}

export default new TheServer();
