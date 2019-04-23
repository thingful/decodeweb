defmodule Decode.Dashboard do
  @moduledoc """
  This module defines our interface for interacting with the Dashboard API.
  We expose a single method where we send across a login request and either
  receive an OK or error response.
  """
  @type callback_url() :: String.t()
  @type login_request() :: term
  @type login_response() :: term
  @type reason() :: term

  @callback login(callback_url, login_request) :: {:ok, login_response} | {:error, reason}
end

defmodule Decode.Dashboard.Poison do
  @moduledoc """
  HTTPoison based implementation of the behaviour defined in the Decode.Dashboard module.
  """
  @behaviour Decode.Dashboard

  use HTTPoison.Base

  def process_request_headers(headers) do
    [{"content-type", "application/json"} | headers]
  end

  def process_request_options(options) do
    Keyword.put(options, :recv_timeout, 30_000)
  end

  def process_request_body(body) do
    body
    |> Jason.encode!()
  end

  def process_response_body(body) do
    try do
      body
      |> Jason.decode!()
    rescue
      _ -> body
    end
  end

  def login(callback, request) do
    case post(callback, request) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{body: body}} ->
        {:error, body}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, %{message: reason}}
    end
  end
end
