defmodule Cryptoloan.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :credit, :integer
    field :debit, :integer
    field :email, :string
    field :name, :string
    field :wallet, :integer

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :wallet, :debit, :credit])
    |> validate_required([:name, :email, :wallet, :debit, :credit])
  end
  
  def insert_or_update(user) do
    IO.inspect user
  end
end
