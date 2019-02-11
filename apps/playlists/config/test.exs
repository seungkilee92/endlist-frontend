# Since configuration is shared in umbrella projects, this file
# should only configure the :playlists application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

# Configure your database
config :playlists, Playlists.Repo,
  username: "postgres",
  password: "postgres",
  database: "endlist_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
