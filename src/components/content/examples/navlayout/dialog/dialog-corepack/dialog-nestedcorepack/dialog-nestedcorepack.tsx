import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];

export const DialogNestedcorepack = () => {
  const [outerOpened, setOuterOpened] = useState(false);
  const [innerOpened, setInnerOpened] = useState(false);

  const handleOuterOpenedChanged = (event: DialogOpenedChangedEvent) => {
    const nextOpened = Boolean(event.detail.value);
    setOuterOpened(nextOpened);
    if (!nextOpened) {
      setInnerOpened(false);
    }
  };

  const handleInnerOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setInnerOpened(Boolean(event.detail.value));
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="outerDialog"
        dialogTitle="Outer Dialog"
        opened={outerOpened}
        launcher="#buttonOpener"
        onopenedChanged={handleOuterOpenedChanged}
      >
        <div slot="body">
          You can launch another dialog from this dialog.
          <oj-c-dialog
            id="innerDialog"
            dialogTitle="Dialog Inner"
            modality="modal"
            opened={innerOpened}
            launcher="#buttonOpenerNested"
            onopenedChanged={handleInnerOpenedChanged}
          >
            <div slot="body">Inner Dialog</div>
            <div slot="footer">
              <oj-c-button id="okButton2" onojAction={() => setInnerOpened(false)} label="OK" />
            </div>
          </oj-c-dialog>
        </div>
        <div slot="footer">
          <oj-c-button
            id="buttonOpenerNested"
            onojAction={() => setInnerOpened(true)}
            label="Open Dialog"
          />
          <oj-c-button id="okButton" onojAction={() => setOuterOpened(false)} label="OK" />
        </div>
      </oj-c-dialog>
      <oj-c-button
        id="buttonOpener"
        onojAction={() => setOuterOpened(true)}
        label="Open Nested Dialog"
      />
    </div>
  );
};

export default DialogNestedcorepack;
