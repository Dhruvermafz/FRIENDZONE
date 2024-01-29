import axios from "axios";
import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
} from "../constants/userConstants";
import { API_BASE_URL } from "../utils/config";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const result = await axios.get(
      `${API_BASE_URL}/home`
      // 'http://localhost:5000/home'
    );

    dispatch({ type: LOAD_USER_SUCCESS, payload: result.data.userInfo });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAILURE, error: error });
  }
};
