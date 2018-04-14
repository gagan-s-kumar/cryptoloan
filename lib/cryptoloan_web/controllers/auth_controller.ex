
defmodule CryptoloanWeb.AuthController do
  use CryptoloanWeb, :controller
  alias Cryptoloan.Users.User
  
  @doc """
  This action is reached via `/auth/:provider` and redirects to the OAuth2 provider
  based on the chosen strategy.
  """
  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> configure_session(drop: true)
    |> redirect(to: "/")
  end

  @doc """
  This action is reached via `/auth/:provider/callback` is the the callback URL that
  the OAuth2 provider will redirect the user back to with a `code` that will
  be used to request an access token. The access token will then be used to
  access protected resources on behalf of the user.
  """
  def callback(conn, %{"provider" => provider, "code" => code}) do
    # Exchange an auth code for an access token
   
    client = get_token!(provider, code)
    # Request the user's data with the access token
    user = get_user!(provider, client)
    user = Map.put(user["data"], "token", client.token.access_token)
    app_user = User.insert_or_update(user)

    # Store the token in the "database"

    # Store the user in the session under `:current_user` and redirect to /.
    # In most cases, we'd probably just store the user's ID that can be used
    # to fetch from the database. In this case, since this example app has no
    # database, I'm just storing the user map.
    #
    # If you need to make additional resource requests, you may want to store
    # the access token as well.
    IO.inspect "auth controller****"
    IO.inspect app_user
    u = "/"<>Integer.to_string(app_user.id)
    IO.inspect u
    conn
    |> put_session(:current_user, user)
    |> put_session(:access_token, client.token.access_token)
    |> assign(:current_user, get_session(conn, :current_user))
    |> redirect(to: "/")
  end

  defp authorize_url!("coinbase"),   do: Coinbase.authorize_url!(scope: "wallet:user:read,wallet:accounts:read")

  defp get_token!("coinbase", code),   do: Coinbase.get_token!(code: code)

  defp get_user!("coinbase", client) do
    Coinbase.get_user(client)
  end
end
