import { ADD_TOAST, DISMISS_TOAST } from "../actions/types";

// Creates and dismisses snackbars
export default function (state = [], action) {
    switch (action.type) {
        case ADD_TOAST:
            return [
                ...state,
                { text: action.payload.text, action: action.payload.action }
            ];
        case DISMISS_TOAST:
            const [, ...remaining] = state;
            return remaining;
        default:
            return state;
    }
}