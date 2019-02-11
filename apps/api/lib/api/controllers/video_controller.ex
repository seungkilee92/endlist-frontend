defmodule ProtectedApi.VideoController do
    use Api, :controller

    def create(conn, %{"title" => title, "video" => video_url, "playlist" => playlist_id}) do
        case Playlists.api_add_video(title, video_url, playlist_id) do
            {:ok, _added} ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(:created, "Video Added")
            {:error, _errorobj} ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(:unauthorized, "Unauthorized")
            _ ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(200, "Already in")
        end
    end

    def search(conn, %{"query" => query, "max" => max_result}) do
        case Playlists.search_video(query, max_result) do
            {:ok, search_results} ->
                IO.inspect search_results
                conn
                |> put_resp_header("content_type", "application/json")
                |> put_status(:created)
                |> json(search_results)
            {:error, _error_obj} ->
                conn
                |>put_resp_header("content-type", "application/json")
                |> send_resp(:unauthorized, "Unauthorized")
        end
    end

    def delete(conn, %{"id" => id}) do
        case Playlists.delete_video(id) do
            {:ok, _video} ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(:ok, "OK")

            {:error, _errormap} ->
                conn
                |> put_resp_header("content-type", "application/json")
                |> send_resp(401, "Unauthorized")
        end
    end

end
