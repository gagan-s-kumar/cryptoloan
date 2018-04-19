defmodule CryptoloanWeb.UserView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.UserView
  alias CryptoloanWeb.WalletView
  
  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    data = %{id: user.id,
      name: user.name,
      email: user.email,
      debit: user.debit,
      credit: user.credit,
      wallet: user.wallet,
      account_id: user.account_id,
      loan_accepted: user.loan_accepted
    }
  end
end
