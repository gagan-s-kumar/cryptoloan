defmodule Cryptoloan.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cryptoloan.Repo

  schema "users" do
    field :credit, :integer
    field :debit, :integer
    field :email, :string
    field :name, :string
    field :wallet, :integer
    field :token, :string
    field :account_id, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :password_confirmation, :string, virtual: true
    field :loan_accepted, :boolean

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password, :password_hash, :password_confirmation, :wallet, :debit, :credit, :token, :account_id, :loan_accepted])
    |> validate_confirmation(:password)
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_required([:name, :email, :password_hash])
  end

  def find_or_empty(name) do
    user = Repo.get_by(Cryptoloan.Users.User, name: name)
    if user do
      user
    else
      %Cryptoloan.Users.User{name: name}
    end
  end

  def insert_or_update(params) do
    user = find_or_empty(params["name"])
    #Repo.insert_or_update!(changeset(user, params))
  end

  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end

  def put_pass_hash(changeset), do: changeset

  def valid_password?(password) when byte_size(password) > 7 do
    {:ok, password}
  end

  def valid_password?(_), do: {:error, "The password is too short"}
end
