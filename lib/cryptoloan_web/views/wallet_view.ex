defmodule CryptoloanWeb.WalletView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.WalletView
  alias CryptoloanWeb.UserView

  def render("index.json", %{wallets: wallets}) do
    %{data: render_many(wallets, WalletView, "wallet.json")}
  end

  def render("show.json", %{wallet: wallet}) do
    %{data: render_one(wallet, WalletView, "wallet.json")}
  end

  def render("wallet.json", %{wallet: wallet}) do
    %{id: wallet.id,
      currency: wallet.currency,
      balance: wallet.balance,
      user: render_one(wallet.user, UserView, "user.json")
    }
  end
end
