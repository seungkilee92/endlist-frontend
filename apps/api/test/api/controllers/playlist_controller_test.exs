defmodule Api.PlaylistControllerTest do
    use Api.ConnCase
  
    setup do
        :ok = Ecto.Adapters.SQL.Sandbox.checkout(Playlists.Repo)
        Ecto.Adapters.SQL.Sandbox.mode(Playlists.Repo, {:shared, self()})
        :ok
    end

end