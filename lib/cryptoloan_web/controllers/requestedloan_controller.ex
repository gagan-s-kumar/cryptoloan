defmodule CryptoloanWeb.RequestedloanController do
  use CryptoloanWeb, :controller

  alias Cryptoloan.Requestedloans
  alias Cryptoloan.Requestedloans.Requestedloan

  action_fallback CryptoloanWeb.FallbackController

  def index(conn, _params) do
    requestedloans = Requestedloans.list_requestedloans()
    render(conn, "index.json", requestedloans: requestedloans)
  end

  def create(conn, %{"requestedloan" => requestedloan_params}) do
    with {:ok, %Requestedloan{} = requestedloan} <- Requestedloans.create_requestedloan(requestedloan_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", requestedloan_path(conn, :show, requestedloan))
      |> render("show.json", requestedloan: requestedloan)
    end
  end

  def show(conn, %{"id" => id}) do
    requestedloan = Requestedloans.get_requestedloan!(id)
    render(conn, "show.json", requestedloan: requestedloan)
  end

  def update(conn, %{"id" => id, "requestedloan" => requestedloan_params}) do
    requestedloan = Requestedloans.get_requestedloan!(id)

    with {:ok, %Requestedloan{} = requestedloan} <- Requestedloans.update_requestedloan(requestedloan, requestedloan_params) do
      render(conn, "show.json", requestedloan: requestedloan)
    end
  end

  def delete(conn, %{"id" => id}) do
    requestedloan = Requestedloans.get_requestedloan!(id)
    with {:ok, %Requestedloan{}} <- Requestedloans.delete_requestedloan(requestedloan) do
      send_resp(conn, :no_content, "")
    end
  end
end
