defmodule Api.AuthController do
  use Api, :controller

  def create(conn, %{"username" => username, "email" => email, "password" => password}) do
    case Accounts.api_register(username, email, password) do
      {:ok, _user} ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(:created, "Created")

      {:error, _errormap} ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(401, "Unauthorized")
    end
  end

  def login(conn, %{"username" => username, "password" => password}) do
    case Accounts.auth_by_username_and_pass(username, password) do
      {:ok, token} ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(200, %{token: token} |> Poison.encode!())

      {:error, :unauthorized} ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(401, "Unauthorized")

      {:error, :not_found} ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(404, "Not found")
    end
  end

  def validate(conn, _) do
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
        |> put_resp_header("content-type", "application/json")
        |> send_resp(200, claims |> Poison.encode!())

      {:error, _} ->
        conn
        |> send_resp(401, "Unauthorized")
        |> halt()
    end
  end
end
