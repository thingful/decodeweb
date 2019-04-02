defmodule DecodeWeb.DecodeChannel do
  use Phoenix.Channel

  def join("decode:" <> path, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("echo", payload, socket) do
    {:reply, {:ok, payload}, socket}
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
end
