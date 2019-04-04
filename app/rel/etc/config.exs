use Mix.Config

config :demo, DecodeWeb.Endpoint, secret_key_base: System.get_env("SECRET_KEY_BASE")
