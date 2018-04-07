defmodule Cryptoloan.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :wallet, :integer, null: false
      add :debit, :integer, null: false
      add :credit, :integer, null: false

      timestamps()
    end

  end
end
