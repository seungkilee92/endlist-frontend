defmodule Playlists.Repo.Migrations.AddInvitesIndex do
  use Ecto.Migration

  def change do
    create unique_index(:invites, [:playlist_id, :user_id])
  end
end
