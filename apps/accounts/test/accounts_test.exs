defmodule AccountsTest do
    use ExUnit.Case

    setup do
        :ok = Ecto.Adapters.SQL.Sandbox.checkout(Accounts.Repo)
        Ecto.Adapters.SQL.Sandbox.mode(Accounts.Repo, {:shared, self()})
        :ok
    end

    describe "User Tests" do

        test "Register User" do

            initial_size = Accounts.list_users() |> length()
            { ret_status, ret_user } = Accounts.api_register("tuser1", "tuser1@email.com", "tuser1pw")
            new_size = Accounts.list_users() |> length()

            assert "tuser1" == ret_user.username
            assert "tuser1@email.com" == ret_user.email
            assert "tuser1pw" == ret_user.credential.password
            assert new_size - 1 == initial_size
            assert ret_status == :ok

        end

        test "Login the User" do
            { :ok, user }             = Accounts.api_register("tuser1", "tuser1@email.com", "tuser1pw")
            { ret_status, ret_token } = Accounts.auth_by_username_and_pass(user.username, user.credential.password)

            assert ret_status == :ok
            assert length(ret_token |> String.codepoints()) > 0
        end

        test "Get User works" do
            { _ret_status, ret_user } = Accounts.api_register("tuser1", "tuser1@email.com", "tuser1pw")
            obtained_user = Accounts.get_user_by_username(ret_user.username)
            assert ret_user.id == obtained_user.id

        end

        test "Delete User" do
            { _r_status, r_user } = Accounts.api_register("tuser1", "tuser1@email.com", "tuser1pw")
            initial_size = Accounts.list_users() |> length()
            { d_status, d_user } = Accounts.delete_user(r_user.credential.user_id)
            post_size = Accounts.list_users() |> length()

            assert d_status == :ok
            assert r_user.credential.user_id == d_user.id
            assert initial_size - 1 == post_size
        end

    end


end
