import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Modal, Button } from "semantic-ui-react";
import { webViewStore } from "../../store/WebViewStore";
import { localstr } from "../../../localization/Localization";
@observer
export class OptionModal extends React.Component<
  {
    trigger?: JSX.Element;
    onClose?: Function;
    headerText: string;
    open?: boolean;
  },
  any
> {
  @observable open: boolean = false;
  componentDidUpdate() {
    // if (this.props.open != null) {
    //   this.open = this.props.open;
    // }
  }

  render() {
    var trigger = React.cloneElement(this.props.trigger, {
      onClick: () => {
        if (this.props.trigger.props.onClick())
          this.props.trigger.props.onClick();
        else this.open = true;
      }
    });
    var open = this.props.open && this.open;
    console.log("Open:", this.open);

    return (
      <Modal
        trigger={trigger}
        open={open}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        mountNode={webViewStore.modalRoot}
      >
        <Modal.Header content={this.props.headerText} />
        <Modal.Content>
          {this.props.children}
          {/* {React.Children.map(
            this.props.children,
            (child: React.ReactElement<any>, index) => {
              var c = React.cloneElement(child, {
                key: index,
                onClick: () => {
                  if (child.props.onClick) child.props.onClick();
                  this.open = false;
                  console.log("click button in option modal");
                }
              });
              return c;
            }
          )} */}
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              //this.props.onClose();
              this.open = false;
              console.log("click button in option modal");
            }}
          >
            {localstr.get("cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
