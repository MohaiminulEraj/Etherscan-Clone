import {
    ETHER_DETAILS_REQUEST,
    ETHER_DETAILS_SUCCESS,
    ETHER_DETAILS_FAIL,
} from '../constants/etherConstants';

export const connectEtherReducer = (state = { etherDetails: {} }, action) => {
    switch (action.type) {
        case ETHER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ETHER_DETAILS_SUCCESS:
            return { loading: false, etherDetails: action.payload }
        case ETHER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}