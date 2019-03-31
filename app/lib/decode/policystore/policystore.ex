defmodule Decode.Policystore do
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
