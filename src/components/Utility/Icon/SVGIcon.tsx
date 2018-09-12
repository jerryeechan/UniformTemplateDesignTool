import * as React from "react";
import { observer } from "mobx-react";

export class SVGIcon extends React.Component<
  { name: string; height?: string; width?: string },
  any
> {
  render() {
    var { width = "24", height = "24" } = this.props;
    return (
      <img
        width={width}
        height={height}
        {...this.props}
        src={"img/icons/" + this.props.name + ".svg"}
      />
    );
  }
}

//must put file in public/img/icons
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
