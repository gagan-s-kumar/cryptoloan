defmodule CryptoloanWeb.PageController do
  use CryptoloanWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
