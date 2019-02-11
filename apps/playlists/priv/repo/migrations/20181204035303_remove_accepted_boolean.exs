defmodule Playlists.Repo.Migrations.RemoveAcceptedBoolean do
  use Ecto.Migration

  def change do
    alter table(:invites) do
      remove :accepted
    end
  end
end
