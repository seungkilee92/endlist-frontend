defmodule Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Accounts.Credential
  alias Playlists.{ Playlist, Invite }

  @derive {Poison.Encoder, only: [:id, :username]}
  schema "users" do
    field :username, :string
    field :email, :string
    has_one :credential, Credential
    has_many :owned_playlists, Playlist
    has_many :invites, Invite
    many_to_many :playlists, Playlist, join_through: "playlists_users"

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
    |> validate_length(:username, min: 1, max: 20)
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def registration_changeset(user, params) do
    user
    |> changeset(params)
    |> cast_assoc(:credential, with: &Credential.changeset/2, required: true)
  end

end
