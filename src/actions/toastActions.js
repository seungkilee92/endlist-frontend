import { ADD_TOAST, DISMISS_TOAST } from "./types"

// Creates a snackbar message
export const addToast = (text, action) => dispatch => {
    dispatch({
        type: ADD_TOAST,
        payload: {
            text,
            action
        }
    })
}

export const dismissToast = (text, action) => dispatch => {
    dispatch({ type: DISMISS_TOAST })
}