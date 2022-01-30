import axios from 'axios';
import {
    ETHER_DETAILS_REQUEST,
    ETHER_DETAILS_SUCCESS,
    ETHER_DETAILS_FAIL,
} from '../constants/etherConstants';

export const connectToEther = (text) => async (dispatch) => {
    try {
        dispatch({ type: ETHER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/search?text=${text}`)

        dispatch({
            type: ETHER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ETHER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}