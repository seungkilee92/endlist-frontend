# Since configuration is shared in umbrella projects, this file
# should only configure the :accounts application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

config :accounts,
        ecto_repos: [Accounts.Repo]

import_config "#{Mix.env()}.exs"
