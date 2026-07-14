import "oj-c/button";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/input-text";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];
type InputTextValue = ComponentProps<"oj-c-input-text">["value"];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-text">["onvalueChanged"]>
>[0];

export const DialogModelesscorepack = () => {
  const [opened, setOpened] = useState(false);
  const [textVal1, setTextVal1] = useState<InputTextValue>("");
  const [textVal2, setTextVal2] = useState<InputTextValue>("");

  const handleOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setOpened(Boolean(event.detail.value));
  };

  const handleTextVal1ValueChanged = (event: InputTextValueChangedEvent) => {
    setTextVal1((event.detail.value as string | null) ?? "");
  };

  const handleTextVal2ValueChanged = (event: InputTextValueChangedEvent) => {
    setTextVal2((event.detail.value as string | null) ?? "");
  };

  return (
    <div id="dialogWrapper">
      <oj-c-dialog
        id="modelessDialog1"
        dialogTitle="Modeless Dialog"
        modality="modeless"
        aria-describedby="desc"
        opened={opened}
        launcher="#buttonOpener"
        onopenedChanged={handleOpenedChanged}
      >
        <div slot="body">
          <p id="desc">
            This is an example of a modeless dialog. Interaction with other window areas and
            components is possible when a modeless dialog is displayed.
          </p>
        </div>
        <div slot="footer">
          <oj-c-button id="okButton" onojAction={() => setOpened(false)} label="OK" />
        </div>
      </oj-c-dialog>
      <oj-c-button
        id="buttonOpener"
        onojAction={() => setOpened(true)}
        label="Open Modeless Dialog"
      />
      <div class="oj-sm-padding-4x-top" id="form-container">
        <oj-c-form-layout direction="row" maxColumns={1}>
          <oj-c-input-text
            value={textVal1}
            labelHint="Address 1"
            onvalueChanged={handleTextVal1ValueChanged}
          />
          <oj-c-input-text
            value={textVal2}
            labelHint="Address 2"
            onvalueChanged={handleTextVal2ValueChanged}
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
};

export default DialogModelesscorepack;
