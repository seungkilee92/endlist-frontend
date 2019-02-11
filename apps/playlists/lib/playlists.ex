defmodule Playlists do
  @moduledoc """

  """

  defdelegate get_playlist(id),                                      to: Playlists.Actions
  defdelegate get_playlist!(id),                                     to: Playlists.Actions
  defdelegate get_playlist_by_title(title),                          to: Playlists.Actions
  defdelegate list_playlists_by_member(username),                    to: Playlists.Actions
  defdelegate list_playlists_by_user(username),                      to: Playlists.Actions
  defdelegate create_invite(attrs),                                  to: Playlists.Actions
  defdelegate accept_invite(id),                                     to: Playlists.Actions
  defdelegate delete_invite(id),                                     to: Playlists.Actions
  defdelegate api_create_playlist(title, icon, is_private, creator), to: Playlists.Actions
  defdelegate search_video(query, max_result \\ 10),                 to: Playlists.Actions
  defdelegate get_video(url),                                        to: Playlists.Actions
  defdelegate api_add_video(title, url, playlist_id),                to: Playlists.Actions
  defdelegate delete_video(url),                                     to: Playlists.Actions

end
