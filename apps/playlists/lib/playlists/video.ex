defmodule Playlists.Video do
  use Ecto.Schema
  import Ecto.Changeset

  alias Playlists.Playlist

  @derive {Poison.Encoder, only: [:id, :title, :url, :votes]}
  schema "videos" do
    field :title, :string
    field :url, :string
    field :votes, :integer, default: 0
    belongs_to :playlist, Playlist

    timestamps()
  end

  def changeset(video, attrs) do
    video
    |> cast(attrs, [:title, :url])
    |> validate_required([:title, :url])
  end

  def add_changeset(video, params) do
    video
    |> changeset(params)
    |> put_assoc(:playlist, params.playlist)
  end
end
