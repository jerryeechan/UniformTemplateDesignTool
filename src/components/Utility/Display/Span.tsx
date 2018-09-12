import * as React from "react";
import { observer } from "mobx-react";
@observer
export class Span extends React.Component<
  {
    text: string;
    margin?: number;
    marginLeft?: number;
    marginRight?: number;
    link?: string;
  },
  any
> {
  render() {
    var { margin = 0, marginLeft = 0, text, link } = this.props;
    return (
      <span style={{ margin: margin, marginLeft: marginLeft }}>
        {"\u00A0"}
        {link ? <a href={link}>{text}</a> : text}
        {"\u00A0"}
      </span>
    );
  }
}
