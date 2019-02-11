# Since configuration is shared in umbrella projects, this file
# should only configure the :accounts application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

# Configure your database
config :accounts, Accounts.Repo,
  username: "postgres",
  password: "postgres",
  database: "endlist_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
