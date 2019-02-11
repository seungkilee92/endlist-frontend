defmodule Accounts do

  defdelegate get_user(id),                                     to: Accounts.Actions
  defdelegate get_user!(id),                                    to: Accounts.Actions
  defdelegate get_user_by(params),                              to: Accounts.Actions
  defdelegate get_user_by_username(username),                   to: Accounts.Actions
  defdelegate list_users(),                                     to: Accounts.Actions
  defdelegate list_invites(id),                                 to: Accounts.Actions
  defdelegate delete_user(id),                                  to: Accounts.Actions
  defdelegate delete_all_users(),                               to: Accounts.Actions
  defdelegate api_register(username, email, password),          to: Accounts.Actions
  defdelegate auth_by_username_and_pass(username, given_pass),  to: Accounts.Actions

end
