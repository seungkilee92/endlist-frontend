import {
    FETCH_INVITES, CREATE_INVITE
} from "../actions/types"

// Handles registration and login
export default function (state = {
    invites: null,
    status: null
}, action) {
    switch (action.type) {
        case FETCH_INVITES:
            return {
                invites: action.payload,
                status: null
            }
        case CREATE_INVITE:
            return {
                invites: state.invites,
                status: action.status
            }
        default:
            return state
    }
}