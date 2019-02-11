defmodule PlaylistsTest do
  use ExUnit.Case


  setup do

    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Playlists.Repo) && Ecto.Adapters.SQL.Sandbox.checkout(Accounts.Repo)
    Ecto.Adapters.SQL.Sandbox.mode(Playlists.Repo, {:shared, self()})
    :ok
  end

  describe "Playlist" do

    test "create a playlist" do
      # { :ok, user } = Accounts.api_register("Thakugan3", "JennLe3@gmail.com", "BabyItsColdOutside")   

      # { _, playlist1 } = Playlists.api_create_playlist("title", "icon", false, user.username)
      # assert playlist1.user_id == user.id
      # assert 1 == length(Playlists.list_playlists_by_user(user.username))
    end

  end
end
