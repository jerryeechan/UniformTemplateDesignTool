import * as React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../store/UserStore";
import { Form, Input, Button } from "semantic-ui-react";
import { UserAvatar } from "../../User/Component/UserAvatar";
import { localstr } from "../../../localization/Localization";
@observer
export class ReplyForm extends React.Component<
  {
    onChange?: (value) => void;
    onSubmit: (value: string) => void;
    displayAvatar?: boolean;
  },
  any
> {
  dszfased() {}
  sendComment = (a, b) => {
    this.props.onSubmit(this.inputText);
    this.input.value = "";
  };

  inputHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    var element = event.target as HTMLInputElement;
    console.log(element.value);
    this.inputText = element.value;
    this.input = event.target;
    if (this.props.onChange) this.props.onChange(this.inputText);
  };
  input;
  inputText: string;
  render() {
    var { displayAvatar = true } = this.props;
    return (
      <div>
        {userStore.currentUser && (
          <Form onSubmit={this.sendComment} reply style={{ width: "100%" }}>
            {/* <Form.Input ref="input" placeholder="~留言..." /> */}
            <div style={{ display: "flex" }}>
              {displayAvatar && <UserAvatar user={userStore.currentUser} />}
              <Input
                style={{ flex: 1 }}
                ref={ref => {
                  this.input = ref;
                }}
                // placeholder={placeHolder}
                onChange={this.inputHandler}
                focus={true}
              />
              <Button color="teal">{localstr.get("send")}</Button>
            </div>
          </Form>
        )}
      </div>
    );
  }
}
