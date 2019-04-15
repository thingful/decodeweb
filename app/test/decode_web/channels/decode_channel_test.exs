defmodule DecodeWeb.DecodeChannelTest do
  use DecodeWeb.ChannelCase

  import Mox

  setup :set_mox_global
  setup :verify_on_exit!

  setup do
    {:ok, _, socket} =
      socket(DecodeWeb.UserSocket, "user_id", %{})
      |> subscribe_and_join(DecodeWeb.DecodeChannel, "decode:lobby")

    {:ok, socket: socket}
  end

  test "load_policies receives back a list of policies", %{socket: socket} do
    Decode.Policystore.Mock
    |> expect(:list_policies, fn -> {:ok, %{"policies" => []}} end)

    ref = push(socket, "load_policies", %{})
    assert_reply(ref, :ok, %{"policies" => []})
  end

  test "load_policies on error returns that error", %{socket: socket} do
    Decode.Policystore.Mock
    |> expect(:list_policies, fn -> {:error, %{"msg" => "error"}} end)

    ref = push(socket, "load_policies", %{})
    assert_reply(ref, :error, %{"msg" => "error"})
  end

  test "load_authorizable_attribute gets an attribute", %{socket: socket} do
    Decode.Credentials.Mock
    |> expect(:get_authorizable_attribute, fn attribute_id ->
      {:ok, %{authorizable_attribute_id: attribute_id}}
    end)

    ref =
      push(socket, "load_authorizable_attribute", %{
        "authorizable_attribute_id" => "foobar",
        "device_token" => "abc123"
      })

    assert_reply(ref, :ok, %{
      device_token: "abc123",
      authorizable_attribute: %{authorizable_attribute_id: "foobar"}
    })
  end

  test "load_authorizable_attribute returns an error", %{socket: socket} do
    Decode.Credentials.Mock
    |> expect(:get_authorizable_attribute, fn _attribute_id -> {:error, %{"msg" => "error"}} end)

    ref =
      push(socket, "load_authorizable_attribute", %{
        "authorizable_attribute_id" => "foobar",
        "device_token" => "abc123"
      })

    assert_reply(ref, :error, %{"msg" => "error"})
  end

  test "request_credential on success", %{socket: socket} do
    Decode.Credentials.Mock
    |> expect(:obtain_credential, fn _request -> {:ok, %{}} end)

    ref =
      push(socket, "request_credential", %{
        "device_token" => "abc123",
        "credential_request" => %{"authorizable_attribute_id" => "foobar"}
      })

    assert_reply(ref, :ok, %{
      device_token: "abc123",
      authorizable_attribute_id: "foobar",
      ci_credential: %{}
    })
  end

  test "request_credential on error", %{socket: socket} do
    Decode.Credentials.Mock
    |> expect(:obtain_credential, fn _request -> {:error, %{"msg" => "error"}} end)

    ref =
      push(socket, "request_credential", %{
        "device_token" => "abc123",
        "credential_request" => %{"authorizable_attribute_id" => "foobar"}
      })

    assert_reply(ref, :error, %{"msg" => "error"})
  end

  test "create_stream on success", %{socket: socket} do
    Decode.Encoder.Mock
    |> expect(:create_stream, fn _request -> {:ok, %{stream_uid: "uid", token: "token"}} end)

    ref =
      push(socket, "create_stream", %{
        "request" => %{},
        "device_token" => "abc123",
        "authorizable_attribute_id" => "foobar"
      })

    assert_reply(ref, :ok, %{
      device_token: "abc123",
      authorizable_attribute_id: "foobar",
      stream: %{stream_uid: "uid", token: "token"}
    })
  end

  test "create_stream on error", %{socket: socket} do
    Decode.Encoder.Mock
    |> expect(:create_stream, fn _request -> {:error, %{msg: "error"}} end)

    ref =
      push(socket, "create_stream", %{
        "request" => %{},
        "device_token" => "abc123",
        "authorizable_attribute_id" => "foobar"
      })

    assert_reply(ref, :error, %{msg: "error"})
  end

  test "delete_stream on success", %{socket: socket} do
    Decode.Encoder.Mock
    |> expect(:delete_stream, fn _request -> {:ok, %{}} end)

    ref =
      push(socket, "delete_stream", %{
        "stream" => %{"stream_uid" => "uid", "token" => "token"},
        "device_token" => "abc123",
        "authorizable_attribute_id" => "foobar"
      })

    assert_reply(ref, :ok, %{
      device_token: "abc123",
      authorizable_attribute_id: "foobar"
    })
  end

  test "delete_stream on error", %{socket: socket} do
    Decode.Encoder.Mock
    |> expect(:delete_stream, fn _request -> {:error, %{msg: "error"}} end)

    ref =
      push(socket, "delete_stream", %{
        "stream" => %{"stream_uid" => "uid", "token" => "token"},
        "device_token" => "abc123",
        "authorizable_attribute_id" => "foobar"
      })

    assert_reply(ref, :error, %{msg: "error"})
  end
end
