import axios from "axios";

export const CreateUser = data => {
  return dispatch => {
    axios
      .post("http://localhost:8888/api/users", data)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: "GET_ERRORS",
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        });
      });
  };
};
