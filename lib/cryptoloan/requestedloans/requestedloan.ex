defmodule Cryptoloan.Requestedloans.Requestedloan do
  use Ecto.Schema
  import Ecto.Changeset


  schema "requestedloans" do
    field :amount, :integer
    field :duration_requested, :naive_datetime
    field :granted, :boolean, default: false
    belongs_to :user, Cryptoloan.Users.User

    timestamps()
  end

  @doc false
  def changeset(requestedloan, attrs) do
    requestedloan
    |> cast(attrs, [:amount, :duration_requested, :granted, :user_id])
    |> validate_required([:amount, :duration_requested, :granted, :user_id])
  end
end
