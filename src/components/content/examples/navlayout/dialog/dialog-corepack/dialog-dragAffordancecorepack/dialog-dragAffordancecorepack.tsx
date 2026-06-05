import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/radioset";

type DialogDragAffordance = NonNullable<ComponentProps<"oj-c-dialog">["dragAffordance"]>;
type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];
type RadioOptions = NonNullable<ComponentProps<"oj-c-radioset">["options"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const dragAffordanceOptions = [
  { label: "header", value: "header" },
  { label: "none", value: "none" }
] as RadioOptions;

export const DialogDragAffordancecorepack = () => {
  const [dragAffordance, setDragAffordance] = useState<DialogDragAffordance>("header");
  const [opened, setOpened] = useState(false);

  const handleDragAffordanceChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (nextValue === "header" || nextValue === "none") {
      setDragAffordance(nextValue);
    }
  };

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  return (
    <>
      <oj-c-form-layout maxColumns={1}>
        <oj-c-radioset
          id="dialogDragAffordance"
          value={dragAffordance}
          options={dragAffordanceOptions}
          labelHint="Drag Affordance"
          labelEdge="inside"
          onvalueChanged={handleDragAffordanceChanged}
        />
      </oj-c-form-layout>
      <div id="dialogWrapper">
        <oj-c-dialog
          id="dialog1"
          dialogTitle="Drag Affordance Options"
          dragAffordance={dragAffordance}
          opened={opened}
          launcher="#buttonOpener"
          onopenedChanged={handleOpenedChanged}
        >
          <div slot="body">
            <div>dragAffordance: {dragAffordance}</div>
          </div>
          <div slot="footer">
            <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
          </div>
        </oj-c-dialog>
        <oj-c-button id="buttonOpener" onojAction={() => setOpened(true)} label="Open Dialog" />
      </div>
    </>
  );
};

export default DialogDragAffordancecorepack;
