defmodule DecodeWeb.PageController do
  use DecodeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
