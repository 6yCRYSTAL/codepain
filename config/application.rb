require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# require "cloudflare_proxy"
class CloudflareProxy
  def initialize(app)
    @app = app
  end

  def call(env)
    return @app.call(env) unless env["HTTP_CF_VISITOR"]

    env["HTTP_X_FORWARDED_PROTO"] = JSON.parse(env["HTTP_CF_VISITOR"])["scheme"]
    @app.call(env)
  end
end

module Codepain
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    config.middleware.use ::CloudflareProxy
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
