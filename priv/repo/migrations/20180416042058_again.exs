defmodule Cryptoloan.Repo.Migrations.Again do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE notifications DROP COLUMN alert_sent"
    alter table(:notifications) do
      add :balert, :boolean, default: false, null: false
      add :lalert, :boolean, default: false, null: false
      add :ealert, :boolean, default: false, null: false
    end
  end
end
