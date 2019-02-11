import { combineReducers } from "redux"
import toastReducer from "./toastReducer"
import authReducer from "./authReducer"
import playlistReducer from "./playlistReducer"
import inviteReducer from "./inviteReducer"

export default combineReducers({
    toasts: toastReducer,
    auth: authReducer,
    playlists: playlistReducer,
    invites: inviteReducer
})