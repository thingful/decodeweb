defmodule Decode.Policystore do
  @moduledoc """
  This module defines our interface for interacting with the Policystore
  service. It defines a single public method which queries the Policystore
  for a list of all currently published policies.
  """

  @type response() :: term
  @type reason() :: term

  @callback list_policies() :: {:ok, response} | {:error, reason}
end

defmodule Decode.Policystore.Poison do
  @moduledoc """
  Our HTTPoison based implementation of the behaviour defined in the
  Decode.Policystore module.
  """

  @behaviour Decode.Policystore

  use HTTPoison.Base

  @default_endpoint "https://policystore.decodeproject.eu"

  @prefix "/twirp/decode.iot.policystore.PolicyStore/"

  defp endpoint do
    System.get_env("POLICYSTORE_BASE_URL") || @default_endpoint
  end

  def process_request_url(url) do
    endpoint() <> @prefix <> url
  end

  def process_request_headers(headers) do
    [{"content-type", "application/json"} | headers]
  end

  def process_request_body(body) do
    body
    |> Jason.encode!()
  end

  def process_response_body(body) do
    body
    |> Jason.decode!()
  end

  def list_policies() do
    case post("ListEntitlementPolicies", %{}) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{body: body}} ->
        {:error, body}

      {:error, error} ->
        {:error, error}
    end
  end
end
