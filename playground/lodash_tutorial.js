const _ = require("lodash");

// _.isEmpty()
//check xem object/mang rong?
console.log(_.isEmpty([1, 2, 3]));
console.log();

const user1 = {
  credenticals: {
    email: "zepperinkan12@gmai.com",
    password: "yyyyxxxx"
  },
  profile: {
    name: "Nguyen Van A",
    age: 23,
    address: {
      number: 10,
      street: "Nguyen Hue",
      provine: "TPHCM"
    }
  }
};
const user2 = {
  credenticals: {
    email: "zepperinkanerwre12@gmai.com",
    password: "yyyyxxxx"
  }
  //   profile: {
  //     name: "Nguyen Van B",
  //     age: 23,
  //     address:{
  //         number:10,
  //         street:"Nguyen Hue",
  //         provine:"TPHCM"
  //     }
  //   }
};

console.log(user1.profile.address.provine);
if (user2.profile && user2.profile.address) {
  console.log(user1.profile.address.provine);
}
console.log(_.get(user1, "profile.address.provine"));
console.log(
  _.get(user2, "profile.address.provine", "nguoi dung chua nhap address")
);
console.log("=========================");
//_.set
// _.set(user2, "profile.address.provine", "Ha Noi");
user2 = {
  ...user2,
  profile: {
    address: {
      provine: "Ha Noi"
    }
  }
};
console.log(JSON.stringify(user2, undefined, 2));
