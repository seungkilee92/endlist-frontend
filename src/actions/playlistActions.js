import axios from "axios"
import {
    CREATE_PLAYLIST,
    FETCH_PLAYLIST,
    FETCH_OWNED_PLAYLISTS,
    FETCH_JOINED_PLAYLISTS,
    FETCH_SEARCH
} from "./types"

const baseURL = "http://localhost:4000"

export const createPlaylist = playlist => async dispatch => {
    let res
    try {
        res = await axios.post(baseURL + "/playlist", playlist)
    } catch (err) {
        res = { status: err.response.status }
    }
    dispatch({ type: CREATE_PLAYLIST, status: res.status })
}

export const fetchPlaylist = id => async dispatch => {
    var payload = null
    var status = null

    try {
        const res = await axios.get(baseURL + "/playlist/" + id)
        payload = res.data
    } catch (err) {
        status = err.response.status
    }
    dispatch({ type: FETCH_PLAYLIST, payload: payload, status: status })
}

export const fetchOwnedPlaylists = username => async dispatch => {
    var payload = null
    var status = null

    try {
        const res = await axios.get(baseURL + "/playlists/user/" + username)
        payload = res.data
        status = res.status
    } catch (err) {
        status = err.response.status
    }
    dispatch({ type: FETCH_OWNED_PLAYLISTS, payload: payload, status: status })
}

export const fetchJoinedPlaylists = username => async dispatch => {
    var payload = null
    var status = null

    try {
        const res = await axios.get(baseURL + "/playlists/member/" + username)
        payload = res.data
        status = res.status
    } catch (err) {
        status = err.response.status
    }
    dispatch({ type: FETCH_JOINED_PLAYLISTS, payload: payload, status: status })
}

export const fetchSearchResults = query => async dispatch =>  {
    let payload = null
    let status = null

    try {
        const res = await axios.get(baseURL + "/videos/search", query)
        payload = res.data
    } catch (err) {
        status = err.response.status        
    }
    dispatch({ type: FETCH_SEARCH, payload: payload, status: status })
}

// export const addVideo {

// }

// export const