defmodule Cryptoloan.Repo.Migrations.ChangingLoans do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :wallet, :integer, default: 10
    end
    alter table(:loans) do
      add :completed, :boolean, default: false
    end
  end
end
