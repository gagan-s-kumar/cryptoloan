# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :cryptoloan,
  ecto_repos: [Cryptoloan.Repo]

# Configures the endpoint
config :cryptoloan, CryptoloanWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "tqF9nhnmznzA8fUeywSCpAIQyU5tqiE1HrW+NAThB2eIkjkLQn8xaJifvM6GVaVt",
  render_errors: [view: CryptoloanWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Cryptoloan.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


  config :cryptoloan, Cryptoloan.Mailer,
    adapter: Bamboo.SMTPAdapter,
    server: "smtp.sendgrid.net",
    port: 587,
    username: "bitcoinalertsend",
    password: "qwerty2101$$",
    tls: :if_available, # can be `:always` or `:never`
    ssl: false, # can be `true`
    retries: 1

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
