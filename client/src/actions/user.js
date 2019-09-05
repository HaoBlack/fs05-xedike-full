import axios from "axios";

export const getUsers = () => {
  return dispatch => {
    axios.get("http://localhost:8888/api/users").then(res => {
      dispatch({
        type: "GET_USERS",
        payload: res.data
      });
    });
  };
};
