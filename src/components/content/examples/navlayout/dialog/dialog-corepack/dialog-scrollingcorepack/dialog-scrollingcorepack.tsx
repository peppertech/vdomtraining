import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];

export const DialogScrollingcorepack = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="scrollingDialog"
        dialogTitle="Scrolling Dialog"
        opened={opened}
        launcher="#buttonOpener"
        height="18.75rem"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="body">
          <h5>Dialog with scrolling Content</h5>
          <ol>
            <li>Item A</li>
            <li>Item B</li>
            <li>Item C</li>
            <li>Item D</li>
            <li>Item E</li>
            <li>Item F</li>
            <li>Item G</li>
            <li>Item H</li>
            <li>Item I</li>
            <li>Item J</li>
            <li>Item K</li>
            <li>Item L</li>
            <li>Item M</li>
            <li>Item N</li>
          </ol>
        </div>
        <div slot="footer">
          <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
        </div>
      </oj-c-dialog>
      <oj-c-button
        id="buttonOpener"
        onojAction={() => setOpened(true)}
        label="Open Scrolling Dialog"
      />
    </div>
  );
};

export default DialogScrollingcorepack;
