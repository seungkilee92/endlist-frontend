defmodule Accounts.EnsureAuth do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    verification =
      conn
      |> get_req_header("authorization")
      |> Enum.at(0)
      |> Joken.token()
      |> Joken.with_signer(Joken.hs256("VetoTheBeto2018"))
      |> Joken.verify!()

    case verification do
      {:ok, claims} ->
        conn
        |> assign(:current_user, claims)

      {:error, _} ->
        conn
        |> send_resp(401, "Unauthorized")
        |> halt()
    end
  end
end
