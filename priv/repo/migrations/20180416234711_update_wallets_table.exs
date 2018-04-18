defmodule Cryptoloan.Repo.Migrations.UpdateWalletsTable do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE wallets ADD COLUMN account_id varchar(250)"
  end
end
