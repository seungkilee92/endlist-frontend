defmodule Playlists.Repo.Migrations.CreateInvitesTable do
  use Ecto.Migration

  def change do
    create table(:invites) do
      add :accepted, :boolean
      add :playlist_id, references(:playlists, null: false)
      add :user_id, references(:users, null: false)

      timestamps()
    end

    alter table(:videos) do
      timestamps()
    end
  end
end
