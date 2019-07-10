defmodule BoilerplateWeb.ApiController do
  use BoilerplateWeb, :controller
  import Boilerplate.Boilerplate

  def index(conn, _params) do
    text(conn, hello_world())
  end
end
