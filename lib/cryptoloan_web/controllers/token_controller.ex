defmodule CryptoloanWeb.TokenController do
  use CryptoloanWeb, :controller
  alias Cryptoloan.Users.User

  action_fallback CryptoloanWeb.FallbackController

  def create(conn, %{"email" => email, "pass" => pass}) do
    with {:ok, %User{} = user} <- Cryptoloan.Users.get_and_auth_user(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
  
  def create(conn, %{}) do
    conn
    |> put_status(:created)
    |> render("token.json")
  end
end
