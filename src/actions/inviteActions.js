import axios from "axios"
import {
    FETCH_INVITES,
    CREATE_INVITE
} from "./types"

const baseURL = "http://localhost:4000"

export const fetchInvites = id => async dispatch => {
    var state = null

    try {
        const res = await axios.get(baseURL + "/invite/" + id)
        state = res.data
    } catch (err) {
        state = null
    }

    dispatch({ type: FETCH_INVITES, payload: state })
}

export const createInvite = invite => async dispatch => {
    var status = null

    try {
        const res = await axios.post(baseURL + "/invite", invite)
        status = res.status
    } catch (err) {
        status = err.response.status
    }

    dispatch({ type: CREATE_INVITE, status: status })
}