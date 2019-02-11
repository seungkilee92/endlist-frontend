defmodule Api.Router do
  use Api, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :protected_api do
    plug Accounts.EnsureAuth
  end

  scope "/", Api do
    pipe_through :api

    # API for Authentication
    post "/register", AuthController, :create
    post "/login", AuthController, :login
    get "/validate", AuthController, :validate

  end

  scope "/", ProtectedApi do
    pipe_through [:api, :protected_api]

    # API for Users
    resources "/user", UserController, only: [:show]

    # API for Playlists
    resources "/playlist", PlaylistController, only: [:create, :show]
    get "/playlists/user/:username", PlaylistController, :user
    get "/playlists/member/:username", PlaylistController, :member


    # API for Invites
    resources "/invite", InviteController, only: [:create, :show, :update, :delete]

    # API for videos
    resources "/videos", VideoController, only: [:create, :show, :delete]
    post "/videos/search", VideoController, :search

  end

end
