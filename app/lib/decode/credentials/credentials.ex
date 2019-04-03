defmodule Decode.Credentials do
  use HTTPoison.Base

  @default_endpoint "https://credentials.decodeproject.eu"

  defp endpoint do
    System.get_env("CREDENTIALS_BASE_URL") || @default_endpoint
  end

  def process_request_url(url) do
    endpoint() <> url
  end

  def process_request_headers(headers) do
    [{"content-type", "application/json"} | headers]
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

  @doc """
  Send a request to the credential issuer to obtain the authorizable
  attribute info. We need this data to build the UI, as well as building the
  blind credential request.
  """
  def get_authorizable_attribute(attribute_id) do
    case get("/authorizable_attribute/#{attribute_id}") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{body: body}} ->
        {:error, body}

      {:error, error} ->
        {:error, error}
    end
  end

  @doc """
  Send a request to the credential issuer to obtain a Coconut credential. We
  assume here that we have already constructed an appropriate request object
  in the front end.
  """
  def obtain_credential(request) do
    case post("/credential/", request) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{body: %{"detail" => msg}}} ->
        {:error, msg}

      {:error, error} ->
        {:error, error}
    end
  end
end
