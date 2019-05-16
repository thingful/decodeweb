defmodule DecodeWeb.PageControllerTest do
  use DecodeWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200)
  end

  test "GET /pulse", %{conn: conn} do
    response =
      conn
      |> get("/pulse")
      |> text_response(200)

    assert response == "ok"
  end
end
