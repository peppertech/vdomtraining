import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];

export const DialogDimensionscorepack = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="minMaxDialog"
        dialogTitle="Min/Max Dimensions Dialog"
        opened={opened}
        launcher="#buttonOpener"
        resizeBehavior="resizable"
        width="20rem"
        height="15rem"
        minWidth="12rem"
        maxWidth="22rem"
        minHeight="14rem"
        maxHeight="24rem"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="body">Resize this dialog to observe the minimum and maximum dimensions.</div>
        <div slot="footer">
          <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
        </div>
      </oj-c-dialog>
      <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
    </div>
  );
};

export default DialogDimensionscorepack;
