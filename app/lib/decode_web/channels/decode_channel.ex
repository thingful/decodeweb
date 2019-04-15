defmodule DecodeWeb.DecodeChannel do
  use Phoenix.Channel

  @policystore_api Application.get_env(:decode, :policystore_api)
  @credentials_api Application.get_env(:decode, :credentials_api)
  @encoder_api Application.get_env(:decode, :encoder_api)

  def join("decode:lobby", _payload, socket) do
    {:ok, socket}
  end

  @doc """
  Receive a load_policies message, send a request to the policystore to
  obtain policies, then return them to the caller synchronously.
  """
  def handle_in("load_policies", _payload, socket) do
    case @policystore_api.list_policies() do
      {:ok, payload} ->
        {:reply, {:ok, payload}, socket}

      {:error, response} ->
        {:reply, {:error, response}, socket}
    end
  end

  @doc """
  Receive a load authorizable attribute message, including the id and a
  device token. Attempt to fetch the authorizable attribute from the
  credentials store, then return the retrieved authorizable attribute.
  """
  def handle_in(
        "load_authorizable_attribute",
        %{
          "authorizable_attribute_id" => authorizable_attribute_id,
          "device_token" => device_token
        },
        socket
      ) do
    case @credentials_api.get_authorizable_attribute(authorizable_attribute_id) do
      {:ok, authorizable_attribute} ->
        {:reply,
         {:ok, %{device_token: device_token, authorizable_attribute: authorizable_attribute}},
         socket}

      {:error, msg} ->
        {:reply, {:error, msg}, socket}
    end
  end

  @doc """
  Handle credential request message
  """
  def handle_in(
        "request_credential",
        %{"device_token" => device_token, "credential_request" => credential_request},
        socket
      ) do
    case @credentials_api.obtain_credential(credential_request) do
      {:ok, credential} ->
        {:reply,
         {:ok,
          %{
            device_token: device_token,
            authorizable_attribute_id: credential_request["authorizable_attribute_id"],
            ci_credential: credential
          }}, socket}

      {:error, msg} ->
        {:reply, {:error, msg}, socket}
    end
  end

  @doc """
  Handle stream creation message
  """
  def handle_in(
        "create_stream",
        %{
          "request" => request,
          "device_token" => device_token,
          "authorizable_attribute_id" => authorizable_attribute_id
        },
        socket
      ) do
    case @encoder_api.create_stream(request) do
      {:ok, stream} ->
        {:reply,
         {:ok,
          %{
            device_token: device_token,
            authorizable_attribute_id: authorizable_attribute_id,
            stream: stream
          }}, socket}

      {:error, response} ->
        {:reply, {:error, response}, socket}
    end
  end

  @doc """
  Handle stream deletion message
  """
  def handle_in(
        "delete_stream",
        %{
          "stream" => stream,
          "device_token" => device_token,
          "authorizable_attribute_id" => authorizable_attribute_id
        },
        socket
      ) do
    case @encoder_api.delete_stream(stream) do
      {:ok, _} ->
        {:reply,
         {:ok,
          %{
            device_token: device_token,
            authorizable_attribute_id: authorizable_attribute_id
          }}, socket}

      {:error, msg} ->
        {:reply, {:error, msg}, socket}
    end
  end
end
