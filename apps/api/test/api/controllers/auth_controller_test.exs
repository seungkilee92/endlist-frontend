defmodule Api.AuthControllerTest do
    use Api.ConnCase
  
    setup do
        :ok = Ecto.Adapters.SQL.Sandbox.checkout(Accounts.Repo)
        Ecto.Adapters.SQL.Sandbox.mode(Accounts.Repo, {:shared, self()})
        :ok
    end

    describe "Happy Path" do
        test "POST /register", %{conn: conn} do
            userdata = %{username: "Thakugan", email: "jennle@email.com", password: "jennpassword"}
            response =
                conn
                |> post(Routes.auth_path(conn, :create, userdata))

            assert response.status == 201
        end

        test "POST /login", %{conn: conn} do
            {:ok, user1} = Accounts.api_register("Thakugan", "jennle@smu.edu", "jennlepw")
            credential = %{username: user1.username, password: user1.credential.password}
            response =
                conn
                |> post(Routes.auth_path(conn, :login, credential))
            
            assert response.status == 200
        end

    end

    describe "Error" do
        test "Responds 401 with User already in", %{conn: conn} do 
            {:ok, user1} = Accounts.api_register("Thakugan", "jennle@smu.edu", "jennlepw")
            userdata = %{username: user1.username, email: user1.email, password: user1.credential.password}
            response =
                conn
                |> post(Routes.auth_path(conn, :create, userdata))

            assert response.status == 401
        end

        test "POST /login", %{conn: conn} do
            credential = %{username: "Not the username", password: "Not the password"}
            response =
                conn
                |> post(Routes.auth_path(conn, :login, credential))
            
            assert response.status == 404
        end
        
    end

end