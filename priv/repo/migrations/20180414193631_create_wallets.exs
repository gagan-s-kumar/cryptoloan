defmodule Cryptoloan.Repo.Migrations.CreateWallets do
  use Ecto.Migration

  def change do
    create table(:wallets) do
      add :currency, :string, null: false
      add :balance, :float, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:wallets, [:user_id])
  end
end
