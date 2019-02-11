defmodule Playlists.TestHelpers do

    def user_fixture(username, email, password) do
       { :ok, user } = Accounts.api_register(username, email, password)   
        user
    end

end