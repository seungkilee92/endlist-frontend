defmodule Playlists.Playlist do
  use Ecto.Schema
  import Ecto.Changeset

  alias Accounts.User
  alias Playlists. {Video, Invite }

  @derive {Poison.Encoder, only: [:id, :title, :icon, :is_private, :user, :videos, :members]}
  schema "playlists" do
    field :title, :string
    field :icon, :string
    field :is_private, :boolean
    has_many :videos, Video
    has_many :invites, Invite
    many_to_many :members, User, join_through: "playlists_users"
    belongs_to :user, User

    timestamps()
  end

  def changeset(playlist, attrs) do
    playlist
    |> cast(attrs, [:title, :icon, :is_private])
    |> validate_required([:title, :is_private])
  end

  def creation_changeset(playlist, params) do
    playlist
    |> changeset(params)
    |> put_assoc(:user, params.user)
  end
end
