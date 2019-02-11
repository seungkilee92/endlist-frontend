import {
    FETCH_PLAYLIST,
    FETCH_OWNED_PLAYLISTS,
    FETCH_JOINED_PLAYLISTS
} from "../actions/types"

export default function (state = {
    curr: null,
    owned: null,
    joined: null,
    status: null }, action) {
    switch (action.type) {
        case FETCH_PLAYLIST:
            return {
                curr: action.payload,
                owned: state.owned,
                joined: state.joined,
                status: action.status
            }
        case FETCH_OWNED_PLAYLISTS:
            return {
                curr: state.curr,
                owned: action.payload,
                joined: state.joined,
                status: action.status
            }
        case FETCH_JOINED_PLAYLISTS:
            return {
                curr: state.curr,
                owned: state.owned,
                joined: action.payload,
                status: action.status
            }
        default:
            return state
    }
}