import * as React from "react";
import { observer } from "mobx-react";
import { Modal, Menu, Icon } from "semantic-ui-react";
import { observable } from "mobx";
@observer
export class PromptModal extends React.Component<
  {
    open: boolean;
    onClose: () => void;
    title: string;
    content: JSX.Element;
    actions: JSX.Element[];
  },
  any
> {
  componentDidMount() {}
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Modal size="small" open={this.props.open} onClose={this.handleClose}>
        <Modal.Header>
          <Modal.Header>
            <Menu secondary>
              <Menu.Item>{this.props.title}</Menu.Item>
              <Menu.Item
                className="right"
                icon="close"
                onClick={this.handleClose}
              >
                <Icon name="close" />
              </Menu.Item>
            </Menu>
          </Modal.Header>
        </Modal.Header>
        <Modal.Content>{this.props.content}</Modal.Content>
        <Modal.Actions>
          {this.props.actions.map(action => {
            return action;
          })}
        </Modal.Actions>
      </Modal>
    );
  }
}
