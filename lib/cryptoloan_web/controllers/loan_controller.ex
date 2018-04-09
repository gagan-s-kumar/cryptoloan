defmodule CryptoloanWeb.LoanController do
  use CryptoloanWeb, :controller

  alias Cryptoloan.Loans
  alias Cryptoloan.Loans.Loan

  action_fallback CryptoloanWeb.FallbackController

  def index(conn, _params) do
    loans = Loans.list_loans()
    render(conn, "index.json", loans: loans)
  end

  def create(conn, %{"loan" => loan_params}) do
    with {:ok, %Loan{} = loan} <- Loans.create_loan(loan_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", loan_path(conn, :show, loan))
      |> render("show.json", loan: loan)
    end
  end

  def show(conn, %{"id" => id}) do
    loan = Loans.get_loan!(id)
    render(conn, "show.json", loan: loan)
  end

  def update(conn, %{"id" => id, "loan" => loan_params}) do
    loan = Loans.get_loan!(id)

    with {:ok, %Loan{} = loan} <- Loans.update_loan(loan, loan_params) do
      render(conn, "show.json", loan: loan)
    end
  end

  def delete(conn, %{"id" => id}) do
    loan = Loans.get_loan!(id)
    with {:ok, %Loan{}} <- Loans.delete_loan(loan) do
      send_resp(conn, :no_content, "")
    end
  end
end
