import "oj-c/button";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/radioset";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type DialogCancelBehavior = NonNullable<ComponentProps<"oj-c-dialog">["cancelBehavior"]>;
type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];
type RadioOptions = NonNullable<ComponentProps<"oj-c-radioset">["options"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const cancelBehaviorOptions = [
  { label: "icon", value: "icon" },
  { label: "escape", value: "escape" },
  { label: "none", value: "none" }
] as RadioOptions;

export const DialogCancelBehaviorcorepack = () => {
  const [cancelBehavior, setCancelBehavior] = useState<DialogCancelBehavior>("icon");
  const [opened, setOpened] = useState(false);

  const handleCancelBehaviorChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (nextValue === "icon" || nextValue === "escape" || nextValue === "none") {
      setCancelBehavior(nextValue);
    }
  };

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <div>
      <oj-c-form-layout maxColumns={1}>
        <oj-c-radioset
          id="dialogCancelBehavior"
          value={cancelBehavior}
          options={cancelBehaviorOptions}
          labelHint="Cancel Behavior"
          labelEdge="inside"
          onvalueChanged={handleCancelBehaviorChanged}
        />
      </oj-c-form-layout>
      <div id="dialogWrapper">
        <oj-c-dialog
          id="dialog1"
          dialogTitle="Cancel Behavior Options"
          cancelBehavior={cancelBehavior}
          opened={opened}
          launcher="#buttonOpener"
          onopenedChanged={handleOpenedChanged}
        >
          <div slot="body">
            <oj-c-input-text
              id="cancelBehavior"
              value={cancelBehavior}
              readonly
              labelHint="Cancel Behavior"
              labelEdge="inside"
              maxWidth="md"
            />
          </div>
          <div slot="footer">
            <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
          </div>
        </oj-c-dialog>
        <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
      </div>
    </div>
  );
};

export default DialogCancelBehaviorcorepack;
