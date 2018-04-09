defmodule Cryptoloan.LoansTest do
  use Cryptoloan.DataCase

  alias Cryptoloan.Loans

  describe "loans" do
    alias Cryptoloan.Loans.Loan

    @valid_attrs %{accepted: true, colletaral: 42, mini_balance: 42}
    @update_attrs %{accepted: false, colletaral: 43, mini_balance: 43}
    @invalid_attrs %{accepted: nil, colletaral: nil, mini_balance: nil}

    def loan_fixture(attrs \\ %{}) do
      {:ok, loan} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Loans.create_loan()

      loan
    end

    test "list_loans/0 returns all loans" do
      loan = loan_fixture()
      assert Loans.list_loans() == [loan]
    end

    test "get_loan!/1 returns the loan with given id" do
      loan = loan_fixture()
      assert Loans.get_loan!(loan.id) == loan
    end

    test "create_loan/1 with valid data creates a loan" do
      assert {:ok, %Loan{} = loan} = Loans.create_loan(@valid_attrs)
      assert loan.accepted == true
      assert loan.colletaral == 42
      assert loan.mini_balance == 42
    end

    test "create_loan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Loans.create_loan(@invalid_attrs)
    end

    test "update_loan/2 with valid data updates the loan" do
      loan = loan_fixture()
      assert {:ok, loan} = Loans.update_loan(loan, @update_attrs)
      assert %Loan{} = loan
      assert loan.accepted == false
      assert loan.colletaral == 43
      assert loan.mini_balance == 43
    end

    test "update_loan/2 with invalid data returns error changeset" do
      loan = loan_fixture()
      assert {:error, %Ecto.Changeset{}} = Loans.update_loan(loan, @invalid_attrs)
      assert loan == Loans.get_loan!(loan.id)
    end

    test "delete_loan/1 deletes the loan" do
      loan = loan_fixture()
      assert {:ok, %Loan{}} = Loans.delete_loan(loan)
      assert_raise Ecto.NoResultsError, fn -> Loans.get_loan!(loan.id) end
    end

    test "change_loan/1 returns a loan changeset" do
      loan = loan_fixture()
      assert %Ecto.Changeset{} = Loans.change_loan(loan)
    end
  end
end
