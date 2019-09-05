import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateUser } from "../../actions/auth";
import _ from "lodash";
import { Button, Form, Container } from "reactstrap";
import "./Style.css";
import Text from "../From/text";
import Select from "../From/select";

const fromConfig = [
  { name: "email", type: "text", value: "" },
  { name: "password", type: "password", value: "" },
  { name: "password2", type: "password", value: "" },
  { name: "DOB", type: "date", value: "" },
  { name: "phone", type: "number", value: "" },
  { name: "userType", type: "select", options: ["driver", "passenger"] }
];
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      DOB: "",
      phone: "",
      userType: "",

      errors: {}
    };
  }
  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.CreateUser(data);
  };

  getFieldValue = field => {
    const newState = { ...this.state, ...field };
    this.setState(newState);
  };

  renderFrom = () => {
    const { errors } = this.state;
    return fromConfig.map((item, index) => {
      switch (item.type) {
        case "select":
          return (
            <Select
              key={index}
              item={item}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            ></Select>
          );

        default:
          return (
            <Text
              key={index}
              item={item}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            ></Text>
          );
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // const { errors } = this.state;
    return (
      <Container className="wapper">
        <Form onSubmit={this.onSubmit}>
          {this.renderFrom()}
          {/* <FormGroup>
            <Label for="Email">Email</Label> */}
          {/* {errors.email && (
              <>
                <Input invalid></Input>
              </>
            )} */}
          {/* <Input
              invalid
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.value}
              placeholder="email"
              invalid={errors.email ? true : false}
            />
            <FormFeedback className="text-danger">{errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label> */}
          {/* {errors.password && (
              <>
                <Input invalid></Input>
                <FormFeedback invalid className="text-danger">
                  {errors.email}
                </FormFeedback>
              </>
            )} */}
          {/* <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password2">Password2</Label>
            <Input
              type="password"
              name="password2"
              id="password2"
              placeholder="password2"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="DOB">DOB</Label>
            <Input
              type="date"
              name="DOB"
              id="DOB"
              placeholder="DOB"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userType">Select</Label>
            <Input
              type="select"
              name="userType"
              id="userType"
              onChange={this.onChange}
              value={this.state.value}
            >
              <option value="driver">Driver</option>
              <option value="passenger">Passenger</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="phone"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup> */}
          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { CreateUser }
)(Register);
