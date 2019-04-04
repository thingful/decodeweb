defmodule DecodeWeb.DecodeChannel do
  use Phoenix.Channel

  def join("decode:lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("load_policies", _payload, socket) do
    case Decode.Policystore.list_policies() do
      {:ok, policies} ->
        push(socket, "policies_loaded", policies)

      {:error, msg} ->
        push(socket, "error", msg)
    end

    {:noreply, socket}
  end

  def handle_in(
        "load_authorizable_attribute",
        %{
          "authorizable_attribute_id" => authorizable_attribute_id,
          "device_token" => device_token
        },
        socket
      ) do
    case Decode.Credentials.get_authorizable_attribute(authorizable_attribute_id) do
      {:ok, authorizable_attribute} ->
        push(socket, "authorizable_attribute_loaded", %{
          device_token: device_token,
          authorizable_attribute: authorizable_attribute
        })

      {:error, msg} ->
        push(socket, "error", %{"error" => msg})
    end

    {:noreply, socket}
  end

  def handle_in(
        "request_credential",
        %{"device_token" => device_token, "credential_request" => credential_request},
        socket
      ) do
    case Decode.Credentials.obtain_credential(credential_request) do
      {:ok, credential} ->
        push(socket, "credential", %{
          device_token: device_token,
          authorizable_attribute_id: credential_request["authorizable_attribute_id"],
          ciCredential: credential
        })

      {:error, msg} ->
        push(socket, "error", %{"error" => msg})
    end

    {:noreply, socket}
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
    case Decode.Encoder.create_stream(request) do
      {:ok, stream} ->
        push(socket, "new_stream", %{
          device_token: device_token,
          authorizable_attribute_id: authorizable_attribute_id,
          stream: stream
        })

      {:error, response} ->
        push(socket, "error", response)
    end

    {:noreply, socket}
  end
end
