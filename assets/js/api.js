class TheServer {
  test_token(data) {
    $.ajax("https://api.coinbase.com/oauth/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        console.log(resp);
      },
      error: (resp) => {
        console.log(resp);
      }
    });
  }
}

export default new TheServer();
