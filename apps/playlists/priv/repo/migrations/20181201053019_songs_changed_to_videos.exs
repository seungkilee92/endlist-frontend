defmodule Playlists.Repo.Migrations.SongsChangedToVideos do
  use Ecto.Migration

  def change do
    rename table(:songs), to: table(:videos)
  end
end
