import {
    FETCH_TOKEN,
    DELETE_TOKEN,
    CREATE_USER
} from "../actions/types"

// Handles registration and login
export default function (state = {
    username: null,
    id: null
}, action) {
    switch (action.type) {
        case FETCH_TOKEN:
            return {
                username: action.payload.username,
                id: action.payload.id,
                status: action.payload.status
            }
        case DELETE_TOKEN:
            return {
                username: null,
                id: null
            }
        case CREATE_USER:
            return {
                status: action.status
            }
        default:
            return state
    }
}