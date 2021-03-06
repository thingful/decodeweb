# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :decode, DecodeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "aC6u5IlYXEyxgxfwF48/FS/CcsDw3zyqzigoQWZAYlKiXbF05rzISde+/1IJxKze",
  render_errors: [view: DecodeWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Decode.PubSub, adapter: Phoenix.PubSub.PG2]

config :decode, :policystore_api, Decode.Policystore.Poison
config :decode, :credentials_api, Decode.Credentials.Poison
config :decode, :encoder_api, Decode.Encoder.Poison
config :decode, :dashboard_api, Decode.Dashboard.Poison

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
