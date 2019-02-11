defmodule Playlists.Repo do
  use Ecto.Repo,
    otp_app: :playlists,
    adapter: Ecto.Adapters.Postgres
end
