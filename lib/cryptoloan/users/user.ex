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
    field :password, :string, virtual: true
    field :password_hash, :string
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email,:password, :password_hash, :wallet, :debit, :credit, :token])
    |> validate_required([:name, :email])
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
end
