defmodule Api.UserControllerTest do
    use Api.ConnCase
  

    # test "index/2 responds with all Users", %{conn: conn} do

        # users = [%{username: "Thakugan", email: "jennle@smu.edu", password: "jennlepw"},
        #          %{username: "JeanReveonir", email: "seungkil@smu.edu", password: "seungkipw"}]
    
        # # create users local to this database connection and test
        # [{:ok, user1},{:ok, user2}] = Enum.map(users, &Accounts.register_user(&1))
    
        # response =
        #   conn
        #   |> get(Routes.user_path(conn, :create))
        #   |> json_response(200)
    
        # expected = %{
        #   "data" => [
        #     %{ "username" => user1.username, "email" => user1.email },
        #     %{ "username" => user2.username, "email" => user2.email }
        #   ]
        # }
    
        # assert response == expected
    # end

end
  