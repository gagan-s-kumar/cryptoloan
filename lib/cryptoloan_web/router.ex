defmodule CryptoloanWeb.Router do
  use CryptoloanWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :assign_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CryptoloanWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/loans", PageController, :index
    get "/approvedloans", PageController, :index
    get "/notification", PageController, :index
    get "/notifications", PageController, :index
    get "/requestedloans", PageController, :index
    get "/users/:id", PageController, :index
    get "/loans/:id", PageController, :index
  end

  scope "/api/v1", CryptoloanWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/notification", NotificationController, except: [:new, :edit]
    resources "/requestedloans", RequestedloanController, except: [:new, :edit]
    resources "/loans", LoanController, except: [:new, :edit]
    resources "/approvedloans", LoanController, except: [:new, :edit]
  end

  scope "/auth", CryptoloanWeb do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    delete "/logout", AuthController, :delete
  end
  
  # Fetch the current user from the session and add it to `conn.assigns`. This
  # will allow you to have access to the current user in your views with
  # `@current_user`.
  defp assign_current_user(conn, _) do
    assign(conn, :current_user, get_session(conn, :current_user))
  end
end
