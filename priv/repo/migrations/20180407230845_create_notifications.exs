defmodule Cryptoloan.Repo.Migrations.CreateNotifications do
  use Ecto.Migration

  def change do
    create table(:notifications) do
      add :bitcoin, :boolean, default: false, null: false
      add :litecoin, :boolean, default: false, null: false
      add :ethereum, :boolean, default: false, null: false
      add :bclimit, :integer
      add :lclimit, :integer
      add :etlimit, :integer
      add :alert_sent, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:notifications, [:user_id])
  end
end
