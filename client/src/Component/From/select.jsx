import React, { Component } from "react";
import { FormGroup, Label, FormFeedback, Input, option } from "reactstrap";

class select extends Component {
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
    // console.log(this.state);
    
    const { item, value, errors } = this.props;
    return (
      <FormGroup>
        <Label for="exampleSelect" className="text-capitalize">
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
        >
          <option>Please select user type</option>
          {item.options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
          {/* <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option> */}
        </Input>
        <FormFeedback className="text-danger">{errors}</FormFeedback>
      </FormGroup>
    );
  }
}

export default select;
