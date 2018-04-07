defmodule Cryptoloan.UsersTest do
  use Cryptoloan.DataCase

  alias Cryptoloan.Users

  describe "users" do
    alias Cryptoloan.Users.User

    @valid_attrs %{credit: 42, debit: 42, email: "some email", name: "some name", wallet: 42}
    @update_attrs %{credit: 43, debit: 43, email: "some updated email", name: "some updated name", wallet: 43}
    @invalid_attrs %{credit: nil, debit: nil, email: nil, name: nil, wallet: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Users.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.credit == 42
      assert user.debit == 42
      assert user.email == "some email"
      assert user.name == "some name"
      assert user.wallet == 42
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Users.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.credit == 43
      assert user.debit == 43
      assert user.email == "some updated email"
      assert user.name == "some updated name"
      assert user.wallet == 43
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
