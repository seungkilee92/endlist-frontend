# Since configuration is shared in umbrella projects, this file
# should only configure the :api application itself
# and only for organization purposes. All other config goes to
# the umbrella root.
use Mix.Config

# General application configuration
config :api,
  generators: [context_app: false]

# Configures the endpoint
config :api, Api.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "d7YNQHfkey5Ibp/d6+8lk2gSaiQpH6OidDH+RTcn4zabb9JslcSqbR40YFA0Nvqk",
  render_errors: [view: Api.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Api.PubSub, adapter: Phoenix.PubSub.PG2]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
