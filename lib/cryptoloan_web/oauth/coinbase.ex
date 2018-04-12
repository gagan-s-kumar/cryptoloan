defmodule Coinbase do
  @moduledoc """
  An OAuth2 strategy for Coinbase.
  """
  use OAuth2.Strategy

  alias OAuth2.Strategy.AuthCode

  defp config do
    [strategy: Coinbase,
     site: "https://api.coinbase.com/v2/",
     authorize_url: "https://www.coinbase.com/oauth/authorize",
     token_url: "http://www.coinbase.com/oauth/token"]
  end

  # Public API

  def client do
    Application.get_env(:cryptoloan, Coinbase)
    |> Keyword.merge(config())
    |> OAuth2.Client.new()
  end

  def client(token) do
    %{client() | token: OAuth2.AccessToken.new(token) }
  end

  def authorize_url!(params \\ []) do
    OAuth2.Client.authorize_url!(client(), params)
  end

  def get_token!(params \\ [], _headers \\ []) do
    OAuth2.Client.get_token!(client(), 
      Keyword.merge(params, client_id: client().client_id, redirect_uri: client().redirect_uri, client_secret: client().client_secret))
  end

  # Strategy Callbacks

  def authorize_url(client, params) do
    AuthCode.authorize_url(client, params)
  end

  def get_token(client, params, headers) do
    params_map = %{grant_type: "authorization_code", code: params[:code], client_id: params[:client_id], client_secret: params[:client_secret], redirect_uri: params[:redirect_uri]}
    IO.inspect HTTPoison.request(:post, "https://api.coinbase.com/oauth/token", Poison.encode!(params_map), [{"Accept", "application/json"}])
    client
    |> put_header("Accept", "application/json")
    |> AuthCode.get_token(params, headers)
  end
end
