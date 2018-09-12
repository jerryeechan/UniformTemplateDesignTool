import * as React from "react";
import { observer } from "mobx-react";
import { ViewContainer, MainContainer } from "../index";
@observer
export class NotFoundPage extends React.Component<any, any> {
  render() {
    return (
      <MainContainer>
        <ViewContainer>
          <div>沒東西...</div>
        </ViewContainer>
      </MainContainer>
    );
  }
}
