defmodule CryptoloanWeb.LoanControllerTest do
  use CryptoloanWeb.ConnCase

  alias Cryptoloan.Loans
  alias Cryptoloan.Loans.Loan

  @create_attrs %{accepted: true, colletaral: 42, mini_balance: 42}
  @update_attrs %{accepted: false, colletaral: 43, mini_balance: 43}
  @invalid_attrs %{accepted: nil, colletaral: nil, mini_balance: nil}

  def fixture(:loan) do
    {:ok, loan} = Loans.create_loan(@create_attrs)
    loan
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all loans", %{conn: conn} do
      conn = get conn, loan_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create loan" do
    test "renders loan when data is valid", %{conn: conn} do
      conn = post conn, loan_path(conn, :create), loan: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, loan_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "accepted" => true,
        "colletaral" => 42,
        "mini_balance" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, loan_path(conn, :create), loan: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update loan" do
    setup [:create_loan]

    test "renders loan when data is valid", %{conn: conn, loan: %Loan{id: id} = loan} do
      conn = put conn, loan_path(conn, :update, loan), loan: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, loan_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "accepted" => false,
        "colletaral" => 43,
        "mini_balance" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, loan: loan} do
      conn = put conn, loan_path(conn, :update, loan), loan: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete loan" do
    setup [:create_loan]

    test "deletes chosen loan", %{conn: conn, loan: loan} do
      conn = delete conn, loan_path(conn, :delete, loan)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, loan_path(conn, :show, loan)
      end
    end
  end

  defp create_loan(_) do
    loan = fixture(:loan)
    {:ok, loan: loan}
  end
end
