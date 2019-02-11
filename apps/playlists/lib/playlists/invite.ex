defmodule Playlists.Invite do
  use Ecto.Schema
  # import Ecto.Changeset

  alias Accounts.User
  alias Playlists.Playlist

  @derive {Poison.Encoder, only: [:id, :playlist]}
  schema "invites" do
    belongs_to :playlist, Playlist
    belongs_to :user, User

    timestamps()
  end

  def changeset(invite, _attrs) do
    invite
  end

end
