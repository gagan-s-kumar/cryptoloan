defmodule Cryptoloan.Repo.Migrations.Debit do
  use Ecto.Migration

  def change do
	alter table(:users) do
		modify :debit, :integer, default: 10
	end
  end
end
