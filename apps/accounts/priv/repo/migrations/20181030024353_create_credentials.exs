defmodule Accounts.Repo.Migrations.CreateCredentials do
  use Ecto.Migration

  def change do
    create table(:credentials) do
      add :username, :string, null: false
      add :password_hash, :string, null: false
      add :user_id, references(:users, on_delete: :delete_all, null: false)

      timestamps()
    end
  end
end
