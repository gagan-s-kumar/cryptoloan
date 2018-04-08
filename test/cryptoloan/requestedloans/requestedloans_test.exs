defmodule Cryptoloan.RequestedloansTest do
  use Cryptoloan.DataCase

  alias Cryptoloan.Requestedloans

  describe "requestedloans" do
    alias Cryptoloan.Requestedloans.Requestedloan

    @valid_attrs %{amount: 42, duration_requested: ~N[2010-04-17 14:00:00.000000], granted: true}
    @update_attrs %{amount: 43, duration_requested: ~N[2011-05-18 15:01:01.000000], granted: false}
    @invalid_attrs %{amount: nil, duration_requested: nil, granted: nil}

    def requestedloan_fixture(attrs \\ %{}) do
      {:ok, requestedloan} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Requestedloans.create_requestedloan()

      requestedloan
    end

    test "list_requestedloans/0 returns all requestedloans" do
      requestedloan = requestedloan_fixture()
      assert Requestedloans.list_requestedloans() == [requestedloan]
    end

    test "get_requestedloan!/1 returns the requestedloan with given id" do
      requestedloan = requestedloan_fixture()
      assert Requestedloans.get_requestedloan!(requestedloan.id) == requestedloan
    end

    test "create_requestedloan/1 with valid data creates a requestedloan" do
      assert {:ok, %Requestedloan{} = requestedloan} = Requestedloans.create_requestedloan(@valid_attrs)
      assert requestedloan.amount == 42
      assert requestedloan.duration_requested == ~N[2010-04-17 14:00:00.000000]
      assert requestedloan.granted == true
    end

    test "create_requestedloan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Requestedloans.create_requestedloan(@invalid_attrs)
    end

    test "update_requestedloan/2 with valid data updates the requestedloan" do
      requestedloan = requestedloan_fixture()
      assert {:ok, requestedloan} = Requestedloans.update_requestedloan(requestedloan, @update_attrs)
      assert %Requestedloan{} = requestedloan
      assert requestedloan.amount == 43
      assert requestedloan.duration_requested == ~N[2011-05-18 15:01:01.000000]
      assert requestedloan.granted == false
    end

    test "update_requestedloan/2 with invalid data returns error changeset" do
      requestedloan = requestedloan_fixture()
      assert {:error, %Ecto.Changeset{}} = Requestedloans.update_requestedloan(requestedloan, @invalid_attrs)
      assert requestedloan == Requestedloans.get_requestedloan!(requestedloan.id)
    end

    test "delete_requestedloan/1 deletes the requestedloan" do
      requestedloan = requestedloan_fixture()
      assert {:ok, %Requestedloan{}} = Requestedloans.delete_requestedloan(requestedloan)
      assert_raise Ecto.NoResultsError, fn -> Requestedloans.get_requestedloan!(requestedloan.id) end
    end

    test "change_requestedloan/1 returns a requestedloan changeset" do
      requestedloan = requestedloan_fixture()
      assert %Ecto.Changeset{} = Requestedloans.change_requestedloan(requestedloan)
    end
  end
end
