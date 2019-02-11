defmodule Api.RoomChannel do
  use Api, :channel

  def join("room:" <> playlist_id, _params, socket) do
    {:ok, assign(socket, :playlist_id, String.to_integer(playlist_id))}
  end

  @doc """
  Indicates that a new user has joined so connected
  rooms should clear user state
  """
  def handle_in("user_joined", %{"user" => user}, socket) do
    broadcast!(socket, "user_joined", %{ user: user })

    {:reply, :ok, assign(socket, :user, user)}
  end

  @doc """
  Informs connections of a user in the room
  """
  def handle_in("in_room", %{"user" => user}, socket) do
    broadcast!(socket, "in_room", %{ user: user })

    {:reply, :ok, socket}
  end

  def handle_in("video_added", _payload, socket) do
    broadcast!(socket, "refresh_room", %{})

    {:reply, :ok, socket}
  end

  def terminate(_reason, socket) do
    broadcast!(socket, "user_left", %{ user: socket.assigns[:user] })
  end
end
