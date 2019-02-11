# Since configuration is shared in umbrella projects, this file
# should only configure the :playlists application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

config :playlists,
        ecto_repos: [Playlists.Repo]

import_config "#{Mix.env()}.exs"
