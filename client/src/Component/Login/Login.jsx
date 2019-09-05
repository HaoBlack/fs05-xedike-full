import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container
} from "reactstrap";
import Text from "../From/text";
import { authLogin } from "../../actions/login";
import { connect } from "react-redux";

const fromconfig = [
  {
    name: "email",
    type: "text",
    value: ""
  },
  { name: "password", type: "password", value: "" }
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  getFiledValue = field => {
    const newState = { ...this.state, ...field };
    this.setState(newState);
  };

  renderFrom = () => {
    return fromconfig.map((item, index) => {
      return (
        <Text
          key={index}
          item={item}
          value={this.state[`${item.name}`]}
          getFiledValue={this.getFiledValue}
        ></Text>
      );
    });
  };

  componentDidMount() {
    this.props.authLogin();
  }

  onSubmit = e => {
    e.preventDefault();
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          {this.renderFrom()}
          {/* <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              type="email"
              name="email"
              id="Email"
              placeholder="with a placeholder"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              id="Password"
              placeholder="password placeholder"
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

export default connect(
  null,
  { authLogin }
)(Login);
