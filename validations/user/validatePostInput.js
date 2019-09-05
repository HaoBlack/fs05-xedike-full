const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");
//email
//khac rong + valid + unique

// password
// >8 + confirm password === password

//DOB
// khac tong + valid (Date)

const validatePostInput = async data => {
  let errors = {};
  // data{email,password, DOB, userTupe,...}
  //   data.email = data.email ? data.email : "";
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.DOB = _.get(data, "DOB", "");
  data.userType = _.get(data, "userType", "");
  data.phone = _.get(data, "phone", "");

  //email
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is require";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email exist";
  }

  //password
  if (validator.isEmail(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password has at least 8 charaters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password must match";
  }

  //data
  if (validator.isEmpty(data.DOB)) {
    errors.DOB = "DOB is required";
  }

  //userType
  if (validator.isEmpty(data.userType)) {
    errors.userType = "User type is required";
  } else if (
    !validator.equals(data.userType, "driver") &&
    !validator.equals(data.userType, "passenger") &&
    !validator.equals(data.userType, "admin")
  ) {
    errors.userType = "User type is invalid";
  }
  //phone
  if (validator.isEmpty(data.phone)) {
    errors.phone = "User type is required";
  } else if (!validator.isLength(data.phone, { min: 10, max: 10 })) {
    errors.phone = "Phone must have 10 charaters";
  }

  
  return {
    isvalid: _.isEmpty(errors), //true (pass het tat ca validate),false(ko pass it nhat 1 field)
    errors
  };
};
module.exports = {
  validatePostInput
};
