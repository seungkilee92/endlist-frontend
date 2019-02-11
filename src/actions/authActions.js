import axios from "axios"
import {
    FETCH_TOKEN,
    CREATE_USER,
    DELETE_TOKEN
} from "./types"

const baseURL = "http://localhost:4000"

// TODO: let's fix this later using redux persists
// if we are using redux, do we need to grab state from browser, direct to redux, and fetch it back?
export const fetchToken = credentials => async dispatch => {
    // keep internal state
    var token = localStorage.getItem("token")
    const currentState = {
        username: null,
        id: null,
        status: 200
    }

    if (credentials) {
        try {
            const { data } = await axios.post(baseURL + "/login", credentials)

            // object form is data.token
            token = data.token
            localStorage.setItem("token", token)
        } catch (err) {
            currentState.token = null
            currentState.status = err.response.status
        }
    }

    if (token) {
        try {
            // Set the authorization header as a default
            axios.defaults.headers.common['authorization'] = token
            const res = await axios.get(baseURL + "/validate")
            currentState.username = res.data.username
            currentState.id = res.data.id
            currentState.status = res.status
        } catch (err) {
            currentState.token = null
            currentState.status = err.response.status
        }
    }
    dispatch({ type: FETCH_TOKEN, payload: currentState })
}

export const deleteToken = () => dispatch => {
    localStorage.removeItem("token")
    dispatch({ type: DELETE_TOKEN })
}

export const createUser = user => async dispatch => {
    var res
    try {
        res = await axios.post(baseURL + "/register", user)
    } catch (err) {
        res = { status: err.response.status }
    }
    dispatch({ type: CREATE_USER, status: res.status })
}