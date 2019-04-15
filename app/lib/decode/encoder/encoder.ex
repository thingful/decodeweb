defmodule Decode.Encoder do
  @moduledoc """
  This module defines our interface for interacting with the Encoder service.
  We expose two methods which allow callers to create or delete encrypted
  streams.
  """
  @type create_stream_request() :: term
  @type create_stream_response() :: term

  @type delete_stream_request() :: term
  @type delete_stream_response() :: term
  @type reason() :: term

  @callback create_stream(create_stream_request) ::
              {:ok, create_stream_response} | {:error, reason}
  @callback delete_stream(delete_stream_request) ::
              {:ok, delete_stream_response} | {:error, reason}
end

defmodule Decode.Encoder.Poison do
  @moduledoc """
  Our HTTPoison based implementation of the behaviour defined in the
  Decode.Encoder module.
  """

  @behaviour Decode.Encoder

  use HTTPoison.Base

  @default_endpoint "https://encoder.decodeproject.eu"

  @prefix "/twirp/decode.iot.encoder.Encoder/"

  defp endpoint do
    System.get_env("ENCODER_BASE_URL") || @default_endpoint
  end

  @doc """
  Process a path into the full URL to the endpoint
  """
  def process_request_url(url) do
    endpoint() <> @prefix <> url
  end

  def process_request_headers(headers) do
    Enum.into([{"content-type", "application/json"}], headers)
  end

  def process_request_body(body) do
    body
    |> Jason.encode!()
  end

  def process_response_body(body) do
    body
    |> Jason.decode!()
  end

  @doc """
  Creates a stream on the stream encoder
  """
  def create_stream(request) do
    case post("CreateStream", request) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{body: body}} ->
        {:error, body}

      {:error, error} ->
        {:error, error}
    end
  end

  @doc """
  Deletes a stream on the stream encoder
  """
  def delete_stream(request) do
    case post("DeleteStream", request) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{body: body}} ->
        {:error, body}

      {:error, error} ->
        {:error, error}
    end
  end
end
