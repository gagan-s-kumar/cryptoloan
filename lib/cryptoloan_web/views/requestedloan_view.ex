defmodule CryptoloanWeb.RequestedloanView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.RequestedloanView

  def render("index.json", %{requestedloans: requestedloans}) do
    %{data: render_many(requestedloans, RequestedloanView, "requestedloan.json")}
  end

  def render("show.json", %{requestedloan: requestedloan}) do
    %{data: render_one(requestedloan, RequestedloanView, "requestedloan.json")}
  end

  def render("requestedloan.json", %{requestedloan: requestedloan}) do
    %{id: requestedloan.id,
      amount: requestedloan.amount,
      duration_requested: requestedloan.duration_requested,
      granted: requestedloan.granted}
  end
end
