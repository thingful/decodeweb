use Mix.Config

config :decode, DecodeWeb.Endpoint,
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  url: [host: System.get_env("HOST"), port: {:system, "PORT"}],
  http: [:inet6, port: System.get_env("PORT") || 4000]
