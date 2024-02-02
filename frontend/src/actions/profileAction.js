import axios from "axios";
import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  SET_UPDATE_FALSE,
} from "../constants/profileConstants";
import { API_BASE_URL } from "../utils/config";

export const updateProfile = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const formdata = new FormData();
    formdata.append("name", userInfo.name);
    formdata.append("gender", userInfo.gender);
    formdata.append("avtar", userInfo.avtar);
    formdata.append("country", userInfo.country);
    formdata.append("dob", userInfo.dob);
    formdata.append("aboutMe", userInfo.aboutMe);

    const result = await axios.put(
      `${API_BASE_URL}/profile`,
      // 'http://localhost:5000/profile',
      formdata
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: result.data.user,
    });
    setTimeout(() => {
      console.log("setTime out ");
      dispatch({ type: SET_UPDATE_FALSE });
    }, 2000);
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, error: error });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const user = await axios.get(
      `${API_BASE_URL}/profile`
      // 'http://localhost:5000/profile'
    );

    dispatch({ type: GET_PROFILE_SUCCESS, payload: user.data.user });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, error: error });
  }
};
