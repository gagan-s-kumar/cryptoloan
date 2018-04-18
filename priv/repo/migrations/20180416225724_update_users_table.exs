defmodule Cryptoloan.Repo.Migrations.UpdateUsersTable do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE users ADD COLUMN account_id varchar(250)"
  end
end
