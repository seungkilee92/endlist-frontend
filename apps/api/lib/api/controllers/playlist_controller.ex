defmodule ProtectedApi.PlaylistController do
    use Api, :controller

    def create(conn, %{"title" => title, "icon" => icon, "is_private" => is_private}) do
        %{"username" => username} = conn.assigns.current_user
        case Playlists.api_create_playlist(title, icon, is_private, username) do
            {:ok, _playlist} ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(:created, "Created")

            {:error, _errormap} ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(401, "Unauthorized")
        end
    end

    def show(conn, %{"id" => id}) do
        playlist = Playlists.get_playlist!(id)

        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(200, playlist |> Poison.encode!)
    end

    def user(conn, %{"username" => username}) do
        playlists = Playlists.list_playlists_by_user(username)
            |> Poison.encode!()

        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(200, playlists)
    end

    def member(conn, %{"username" => username}) do
        playlists = Playlists.list_playlists_by_member(username)
            |> Poison.encode!()

        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(200, playlists)
    end
end
