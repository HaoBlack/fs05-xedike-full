import axios from "axios";

export const authLogin = data => {
  return dispatch => {
    axios.post("http://localhost:8888/api/users/login", data).then(res => {
      console.log(res.data);
      dispatch({
        type: "GET_ERRORS",
        payload: {}
      });
    });
  };
};
