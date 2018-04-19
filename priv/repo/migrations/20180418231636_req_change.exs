defmodule Cryptoloan.Repo.Migrations.ReqChange do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE requestedloans DROP COLUMN duration_requested"
    alter table(:requestedloans) do
      add :duration_requested, :integer, default: 0, null: false
    end
  end
end
