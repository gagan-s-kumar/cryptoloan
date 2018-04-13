defmodule Cryptoloan.Repo.Migrations.UpdateUsersTable do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE users ALTER COLUMN wallet DROP NOT NULL"
    execute "ALTER TABLE users ALTER COLUMN credit DROP NOT NULL"
    execute "ALTER TABLE users ALTER COLUMN debit DROP NOT NULL"
    execute "ALTER TABLE users ALTER COLUMN email DROP NOT NULL"
    execute "ALTER TABLE users DROP COLUMN token"
    execute "ALTER TABLE users ADD COLUMN token varchar(250)"
  end
end
