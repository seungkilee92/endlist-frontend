defmodule Playlists.Actions do
  import Ecto. { Query, Changeset }

  alias Playlists.{ Repo, Playlist, Invite, SearchAdd, Video }


  # Playlists
  def get_playlist(id) do
    Repo.get(Playlist, id)
    |> Repo.preload([:user, :videos, :members])
  end

  def get_playlist!(id) do
    Repo.get!(Playlist, id)
    |> Repo.preload([:user, :videos, :members])
  end

  def get_playlist_by_title(title) do
    from(playlist in Playlist, where: playlist.title == ^title)
    |> Repo.one()
  end

  def list_playlists() do
    Repo.all(Playlist)
  end

  def list_playlists_by_member(username) do
    user = Accounts.get_user_by_username(username)
    Repo.all(Ecto.assoc(user, :playlists))
    |> Repo.preload([:user, :videos, :members])
  end

  def list_playlists_by_user(username) do
    user = Accounts.get_user_by_username(username)
    Repo.all(Ecto.assoc(user, :owned_playlists))
    |> Repo.preload([:user, :videos, :members])
  end

  def create_playlist(attrs) do
    %Playlist{}
    |> Playlist.creation_changeset(attrs)
    |> Repo.insert()
  end

  def create_invite(%{"playlist_id" => playlist_id, "username" => username}) do
    user = Accounts.get_user_by_username(username)
    query = from "playlists_users",
            where: [playlist_id: ^playlist_id, user_id: ^user.id],
            select: [:user_id]

    case Repo.all(query) do
      [] ->
        %Invite{playlist_id: playlist_id, user_id: user.id}
        |> Repo.insert()

      _ ->
        {:error, "User already a member of this playlist"}
    end
  end

  def accept_invite(id) do
    invite = Repo.get!(Invite, id)
      |> Repo.preload([:playlist, :user])
    user = invite.user
      |> Repo.preload(:playlists)
    playlists = user.playlists ++ [invite.playlist]
      |> Enum.map(&Ecto.Changeset.change/1)

    user
    |> change()
    |> put_assoc(:playlists, playlists)
    |> Repo.update()
  end

  def delete_all_playlists() do
    from(u in Playlist) |> Repo.delete_all()
  end

  def delete_invite(id) do
    invite = Repo.get!(Invite, id)
    case Repo.delete invite do
      {:ok, struct} -> {:ok, struct}
      {:error, changeset} -> {:error, changeset}
    end
  end

  def api_create_playlist(title, icon, is_private, username) do
    user = Accounts.get_user_by_username(username)

    create_playlist(%{
      title: title,
      icon: icon,
      is_private: is_private,
      user: user
    })
  end

  # Videos
  def get_video(id) do
    Repo.get(Video, id)
  end

  def list_videos() do
    Repo.all(Video)
  end

  def add_video(attrs) do
    %Video{}
    |> Video.add_changeset(attrs)
    |> Repo.insert()
  end

  def search_video(query, max_result \\ 10) do
    query
    |> String.split()
    |> Enum.join("+")
    |> SearchAdd.display_results(max_result)
  end

  def api_add_video(title, url, playlist_id) do
    playlist = Playlists.get_playlist(playlist_id)
    add_video(%{
      title: title,
      url: url,
      playlist: playlist
    })
  end

  def delete_video(id) do
    video = id |> get_video()
    case Repo.delete video do
      {:ok, struct} -> {:ok, struct}
      {:error, changeset} -> {:error, changeset}
    end
  end

end
