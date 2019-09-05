import React, { Component } from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

class text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.item.name]: props.item.value
    };
  }
  onChange = e => {
    const { item } = this.props;
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.props.getFiledValue({
          [item.name]: this.state[`${item.name}`]
        });
      }
    );
  };
  render() {
    const { item, value, errors } = this.props;
    return (
      <FormGroup>
        <Label for="email" className="text-capitalize">
          {item.name}
        </Label>
        <Input
          type={item.type}
          name={item.name}
          id={item.name}
          placeholder={item.name}
          onChange={this.onChange}
          value={this.state[`${item.name}`]}
          invalid={errors ? true : false}
        />
        <FormFeedback className="text-danger">{errors}</FormFeedback>
      </FormGroup>
    );
  }
}

export default text;
