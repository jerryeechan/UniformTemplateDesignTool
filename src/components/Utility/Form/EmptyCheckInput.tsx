import * as React from "react";
import { observer } from "mobx-react";
import { Form } from "semantic-ui-react";
import { observable } from "mobx";

@observer
export class EmptyCheckInput extends React.Component<
  {
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (name: string, value: string) => void;
    type?: "input" | "textarea";
  },
  any
> {
  @observable fieldValue: string;
  componentWillMount() {
    this.fieldValue = this.props.value;
  }
  componentDidUpdate() {
    if (this.fieldValue == null) this.fieldValue = this.props.value;
  }
  handleChange = (e, { name, value }) => {
    this.fieldValue = value as string;
    this.props.onChange(this.props.name, this.fieldValue);
  };
  render() {
    var { type = "input", placeholder = "輸入文字..." } = this.props;
    return (
      <div>
        {type == "input" ? (
          <Form.Input
            value={this.fieldValue}
            name={this.props.name}
            onChange={this.handleChange}
            label={this.props.label}
            placeholder={this.props.placeholder}
          />
        ) : (
          <Form.TextArea
            value={this.fieldValue}
            name={this.props.name}
            onChange={this.handleChange}
            label={this.props.label}
            placeholder={this.props.placeholder}
          />
        )}
        {this.fieldValue === "" && <p style={{ color: "red" }}> 不可為空</p>}
      </div>
    );
  }
}
