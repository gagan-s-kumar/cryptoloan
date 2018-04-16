defmodule CryptoloanWeb.WalletController do
  use CryptoloanWeb, :controller

  alias Cryptoloan.Wallets
  alias Cryptoloan.Wallets.Wallet

  alias Cryptoloan.Users
  alias Cryptoloan.Users.User

  action_fallback CryptoloanWeb.FallbackController

  def index(conn, _params) do
    wallets = Wallets.list_wallets()
    render(conn, "index.json", wallets: wallets)
  end

  def create(conn, %{"wallet" => wallet_params}) do
    with {:ok, %Wallet{} = wallet} <- Wallets.create_wallet(wallet_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", wallet_path(conn, :show, wallet))
      |> render("show.json", wallet: wallet)
    end
  end

  def show(conn, %{"id" => id}) do
    wallet = Wallets.get_wallet!(id)
    render(conn, "show.json", wallet: wallet)
  end

  def update(conn, %{"id" => id, "wallet" => wallet_params}) do
    wallet = Wallets.get_wallet!(id)

    with {:ok, %Wallet{} = wallet} <- Wallets.update_wallet(wallet, wallet_params) do
      render(conn, "show.json", wallet: wallet)
    end
  end

  def delete(conn, %{"id" => id}) do
    wallet = Wallets.get_wallet!(id)
    with {:ok, %Wallet{}} <- Wallets.delete_wallet(wallet) do
      send_resp(conn, :no_content, "")
    end
  end
  
  def by_user(conn, params) do
    user = Users.get_user!(params["user_id"])
    client = %{token: %{access_token: user.token}}
    accounts = Coinbase.get_accounts(client)
    if !accounts do
      send_resp(conn, :no_content, "")
    else
      Enum.each accounts["data"], fn(account) ->
        acc = %{"user_id" => user.id, "balance" => String.to_float(account["balance"]["amount"]), "currency" => account["balance"]["currency"]}
        Wallet.insert_or_update(acc)
      end
      wallet = Wallets.get_user_wallet(params["user_id"])
      render(conn, "show.json", wallet: wallet)
    end
  end
end
