defmodule Cryptoloan.Loans.Loan do
  use Ecto.Schema
  import Ecto.Changeset


  schema "loans" do
    field :accepted, :boolean, default: false
    field :colletaral, :integer
    field :mini_balance, :integer
    field :completed, :boolean
    belongs_to :requestedloan, Cryptoloan.Requestedloans.Requestedloan
    belongs_to :user, Cryptoloan.Users.User

    timestamps()
  end

  @doc false
  def changeset(loan, attrs) do
    loan
    |> cast(attrs, [:mini_balance, :colletaral, :accepted, :user_id, :requestedloan_id, :completed])
    |> validate_required([:mini_balance, :colletaral, :accepted, :user_id, :requestedloan_id, :completed])
  end
end
