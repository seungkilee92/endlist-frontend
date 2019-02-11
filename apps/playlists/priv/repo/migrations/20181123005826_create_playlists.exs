defmodule Playlists.Repo.Migrations.CreatePlaylists do
  use Ecto.Migration

  def change do
    create table(:playlists) do
      add :title, :string
      add :icon, :string
      add :is_private, :boolean
      add :user_id, references(:users, null: false)

      timestamps()
    end

    create table(:playlists_users) do
      add :playlist_id, references(:playlists, null: false)
      add :user_id, references(:users, null: false)
    end

    create table(:songs) do
      add :title, :string
      add :url, :string
      add :votes, :integer, default: 0
      add :playlist_id, references(:playlists, null: false)
    end

    create unique_index(:playlists, [:title, :user_id])
    create unique_index(:playlists_users, [:playlist_id, :user_id])
    create unique_index(:songs, [:title, :url, :playlist_id])
  end
end
