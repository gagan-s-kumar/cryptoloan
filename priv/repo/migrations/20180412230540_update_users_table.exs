defmodule Cryptoloan.Repo.Migrations.UpdateUsersTable do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE users ALTER COLUMN wallet DROP NOT NULL"
    execute "ALTER TABLE users ALTER COLUMN credit DROP NOT NULL"
    execute "ALTER TABLE users ALTER COLUMN debit DROP NOT NULL"
    execute "ALTER TABLE users ALTER COLUMN email DROP NOT NULL"
    execute "ALTER TABLE users DROP COLUMN IF EXISTS token"
    execute "ALTER TABLE users ADD COLUMN token varchar(250)"
    execute "ALTER TABLE users DROP COLUMN IF EXISTS account_id"
    execute "ALTER TABLE users ADD COLUMN account_id varchar(250)"
    execute "ALTER TABLE users DROP COLUMN IF EXISTS refresh_token"
    execute "ALTER TABLE users ADD COLUMN refresh_token varchar(250)"
  end
end
