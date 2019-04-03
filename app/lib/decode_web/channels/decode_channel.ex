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
        push(socket, "error", msg)
    end

    {:noreply, socket}
  end
end
