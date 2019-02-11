defmodule Accounts.Credential do
  use Ecto.Schema
  import Ecto.Changeset


  schema "credentials" do
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    belongs_to :user, Accounts.User

    timestamps()
  end

  def changeset(credential, attrs) do
    credential
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> validate_length(:password, min: 6, max: 100)
    |> unique_constraint(:username)
    |> check_put_hash()
  end

  defp check_put_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Pbkdf2.hashpwsalt(pass))

      _ ->
        changeset
    end
  end

end
