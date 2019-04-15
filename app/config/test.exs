use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :decode, DecodeWeb.Endpoint,
  http: [port: 4002],
  server: false

config :decode, :policystore_api, Decode.Policystore.Mock
config :decode, :credentials_api, Decode.Credentials.Mock
config :decode, :encoder_api, Decode.Encoder.Mock

# Print only warnings and errors during test
config :logger, level: :warn
