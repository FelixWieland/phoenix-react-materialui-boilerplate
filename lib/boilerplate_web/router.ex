defmodule BoilerplateWeb.Router do
  use BoilerplateWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

	scope "/api", BoilerplateWeb do
		pipe_through(:api)
		post("/*path", ApiController, :index)
  end

  scope "/", BoilerplateWeb do
    # Use the default browser stack
    pipe_through(:browser)
    get("/*path", PageController, :index)
  end
end
