defmodule ProtectedApi.InviteController do
  use Api, :controller

  def create(conn, attrs) do
    case Playlists.create_invite(attrs) do
      {:ok, _invite} ->
          conn
          |> put_resp_header("content-type", "application/json")
          |> send_resp(:created, "Created")

      {:error, _errormap} ->
          conn
          |> put_resp_header("content-type", "application/json")
          |> send_resp(401, "Unauthorized")
    end
  end

  # Shows all invites associated with a user id
  def show(conn, %{"id" => id}) do
    invites = Accounts.list_invites(id)

    conn
    |> put_resp_header("content-type", "application/json")
    |> send_resp(200, invites |> Poison.encode!)
  end

  # Accepts an invite
  def update(conn, %{"id" => id}) do
    case Playlists.accept_invite(id) do
      {:ok, _invite} ->
          Playlists.delete_invite(id)

          conn
          |> put_resp_header("content-type", "application/json")
          |> send_resp(:ok, "OK")

      {:error, _errormap} ->
          conn
          |> put_resp_header("content-type", "application/json")
          |> send_resp(401, "Unauthorized")
    end
  end

  def delete(conn, %{"id" => id}) do
    case Playlists.delete_invite(id) do
      {:ok, _invite} ->
          conn
          |> put_resp_header("content-type", "application/json")
          |> send_resp(:ok, "OK")

      {:error, _errormap} ->
          conn
          |> put_resp_header("content-type", "application/json")
          |> send_resp(401, "Unauthorized")
    end
  end
end
