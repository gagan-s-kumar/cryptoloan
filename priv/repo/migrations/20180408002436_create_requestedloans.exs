defmodule Cryptoloan.Repo.Migrations.CreateRequestedloans do
  use Ecto.Migration

  def change do
    create table(:requestedloans) do
      add :amount, :integer
      add :duration_requested, :naive_datetime
      add :granted, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:requestedloans, [:user_id])
  end
end
