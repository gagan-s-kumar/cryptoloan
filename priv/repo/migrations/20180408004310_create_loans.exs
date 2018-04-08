defmodule Cryptoloan.Repo.Migrations.CreateLoans do
  use Ecto.Migration

  def change do
    create table(:loans) do
      add :mini_balance, :integer
      add :colletaral, :integer
      add :accepted, :boolean, default: false, null: false
      add :requestedloan_id, references(:requestedloans, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:loans, [:requestedloan_id])
    create index(:loans, [:user_id])
  end
end
