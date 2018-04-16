defmodule Cryptoloan.Repo.Migrations.UpdateNotifications do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE notifications DROP COLUMN bitcoin"
    execute "ALTER TABLE notifications DROP COLUMN litecoin"
    execute "ALTER TABLE notifications DROP COLUMN ethereum"
    alter table(:notifications) do
      modify :bclimit, :integer, default: 0, null: false
      modify :lclimit, :integer, default: 0, null: false
      modify :etlimit, :integer, default: 0, null: false
    end
  end
end
