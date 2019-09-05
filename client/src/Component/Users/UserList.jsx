import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";

class UserList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  // mapStateToProps = state => {
  //   return {
  //     users: state.users
  //   };
  // };
  render() {
    console.log(this.props.users);

    return (
      <div>
        <h4>LIST USERS</h4>
      </div>
    );
  }
}

export default connect(
  null,
  { getUsers }
)(UserList);
