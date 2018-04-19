defmodule Cryptoloan.Repo.Migrations.CreditDebit do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :credit, :integer, default: 0
      modify :debit, :integer, default: 0
      add :loan_accepted, :boolean, default: false
    end
  end
end
