import * as React from "react";
import { observer } from "mobx-react";
import { Visibility } from "semantic-ui-react";
import { uniformStore } from "../../Store/UniformHomePageStore";
import { SectionStore } from "./SectionStore";
@observer
export class VisibilitySection extends React.Component<
  { section: string; sectionStore: SectionStore },
  any
> {
  render() {
    return (
      <Visibility
        once={false}
        onBottomVisible={() => {
          if (!uniformStore.isScrollingAnimation) {
            this.props.sectionStore.activeSection = this.props.section;
          }
        }}
      >
        {this.props.children}
      </Visibility>
    );
  }
}
