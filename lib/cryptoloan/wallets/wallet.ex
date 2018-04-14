defmodule Cryptoloan.Wallets.Wallet do
  use Ecto.Schema
  import Ecto.Changeset
  alias Cryptoloan.Repo

  schema "wallets" do
    field :balance, :float
    field :currency, :string
    belongs_to :user, Cryptoloan.Users.User

    timestamps()
  end

  @doc false
  def changeset(wallet, attrs) do
    wallet
    |> cast(attrs, [:currency, :balance, :user_id])
    |> validate_required([:currency, :balance, :user_id])
  end
   
  def find_or_empty(user_id, currency, balance) do
    wallet = Repo.get_by(Cryptoloan.Wallets.Wallet, currency: currency, user_id: user_id)
    if wallet do
      wallet
    else
      %Cryptoloan.Wallets.Wallet{user_id: user_id, balance: balance, currency: currency}
    end
  end
  
  def insert_or_update(params) do
    wallet = find_or_empty(params["user_id"], params["currency"], params["balance"])
    IO.inspect wallet
    Repo.insert_or_update!(changeset(wallet, params))
  end
end
