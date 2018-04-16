// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import store from "./components/store";
import api from "./components/api";

import cryptoloan_init from "./components/cryptoloan";

$(function() {
  api.request_notifications();
  api.request_loans();
  api.request_requestedloans();
  api.request_users();
  api.request_wallets();
  api.get_eth_graph_data();
  api.get_btc_graph_data();
  api.get_ltc_graph_data();
  cryptoloan_init(store);
});
