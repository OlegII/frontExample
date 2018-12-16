import {SAVE_ERRORS} from "./error.action";

export function errors (state = {}, action){
    switch (action.type) {
        case SAVE_ERRORS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}