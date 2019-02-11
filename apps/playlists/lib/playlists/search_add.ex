defmodule Playlists.SearchAdd do

    def display_results(query, max_result \\ 10) do
        key = System.get_env("API_KEY")
        url = "https://www.googleapis.com/youtube/v3/search?part=id&q=#{query}&maxResults=#{max_result}&type=video&key=#{key}"

        case HTTPoison.get(url) do
            # Parse Youtube API response
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
                results = Poison.decode!(body)
                |> Map.get("items")
                |> Enum.map(&(&1["id"]))
                |> Enum.map(&(&1["videoId"]))
                |> Enum.map(&(&1 |> get_video))
                
                {:ok, results}
                
            {:ok, %HTTPoison.Response{status_code: 404}} ->
                IO.puts "Not found :("

            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end

    end

    def get_video(videoId) do
        key = System.get_env("API_KEY")
        url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=#{videoId}&key=#{key}"
        case HTTPoison.get(url) do
            # retrive Item, Title, Thumbnail information for disply
            {:ok, %HTTPoison.Response{status_code: 200, body: video}} ->
                items = Poison.decode!(video)                
                |> Map.get("items")
                
                id = items
                |> get_video_id()

                snippet = items
                |> get_snippet()

                title = snippet
                |> get_title()
                
                thumbnail = snippet
                |> get_thumbnail()


                %{ id: id, title: title, thumbnail: thumbnail }

            {:ok, %HTTPoison.Response{status_code: 404}} ->
                IO.puts "Not found :("

            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end
    end

    defp get_video_id(itemlist) do
        [id] = itemlist
        |> Enum.map(&( &1["id"] ))
        id
    end

    defp get_snippet(itemlist) do
        itemlist
        |> Enum.map(&( &1["snippet"] ))
    end

    defp get_title(snip) do
        [title] = snip
        |> Enum.map(&( &1["title"] ))
        title
    end

    defp get_thumbnail(snip) do
        [thumbnail] = snip
        |> Enum.map(&( &1["thumbnails"] ))
        |> Enum.map(&( &1["medium"] ))
        |> Enum.map(&( &1["url"] ))
        thumbnail
    end

    def retrieve_video(%{ id: id, title: title, thumbnail: _thumbnail }) do
        %{id: id, title: title}
    end

end