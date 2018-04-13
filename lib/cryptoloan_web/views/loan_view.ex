defmodule CryptoloanWeb.LoanView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.LoanView
  alias CryptoloanWeb.RequestedloanView
  alias CryptoloanWeb.UserView

  def render("index.json", %{loans: loans}) do
    %{data: render_many(loans, LoanView, "loan.json")}
  end

  def render("show.json", %{loan: loan}) do
    %{data: render_one(loan, LoanView, "loan.json")}
  end

  def render("loan.json", %{loan: loan}) do
    %{id: loan.id,
      mini_balance: loan.mini_balance,
      colletaral: loan.colletaral,
      accepted: loan.accepted,
      requestedloan_id: render_one(loan.requestedloan, RequestedloanView, "requestedloan.json"),
      user_id: render_one(loan.user, UserView, "user.json")}
  end
end
