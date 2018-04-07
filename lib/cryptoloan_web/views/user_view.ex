defmodule CryptoloanWeb.UserView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
      debit: user.debit,
      credit: user.credit}
  end
end
