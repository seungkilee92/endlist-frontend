defmodule ProtectedApi.UserController do
  use Api, :controller

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id) |> Poison.encode!()

    conn
    |> send_resp(200, user)
  end
end
