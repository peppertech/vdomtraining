import { h, ComponentProps } from "preact";
import { useMemo, useState, useCallback } from "preact/hooks";
import "ojs/ojcheckboxset";
import "ojs/ojfilepicker";
import "ojs/ojoption";
import "ojs/ojlabel";
import type { FilePickerElement } from "ojs/ojfilepicker";

const DEFAULT_ACCEPT = "image/*";

const FilePicker = () => {
  const [multipleSelection, setMultipleSelection] = useState<string[]>(["multiple"]);
  const [disabledSelection, setDisabledSelection] = useState<string[]>([]);
  const [acceptInput, setAcceptInput] = useState(DEFAULT_ACCEPT);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [invalidMessage, setInvalidMessage] = useState("None");

  const selectionMode = useMemo<FilePickerElement["selectionMode"]>(() => {
    return multipleSelection.includes("multiple") ? "multiple" : "single";
  }, [multipleSelection]);

  const isDisabled = useMemo(() => disabledSelection.includes("disable"), [disabledSelection]);
  const acceptArray = useMemo(() => acceptInput.split(",").map((value) => value.trim()).filter(Boolean), [acceptInput]);
  const acceptValue = acceptArray.length > 0 ? acceptArray : undefined;

  const handleSelect = useCallback((event: FilePickerElement.ojSelect) => {
    const files = Array.from(event.detail.files ?? []);
    setSelectedFiles(files);
    setInvalidMessage("None");
  }, []);

  const handleInvalidSelect = useCallback((event: FilePickerElement.ojInvalidSelect) => {
    const messages = event.detail.messages ?? [];
    setInvalidMessage(messages.map((message) => message.summary).join("; ") || "Unknown error");
  }, []);

  type CheckboxSetProps = ComponentProps<"oj-checkboxset">;
  type CheckboxValueChangedEvent = Parameters<NonNullable<CheckboxSetProps["onvalueChanged"]>>[0];

  const handleMultipleChange = useCallback((event: CheckboxValueChangedEvent) => {
    setMultipleSelection((event.detail.value ?? []) as string[]);
  }, []);

  const handleDisabledChange = useCallback((event: CheckboxValueChangedEvent) => {
    setDisabledSelection((event.detail.value ?? []) as string[]);
  }, []);

  return (
    <div id="parentContainer" class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-file-picker
        accept={acceptValue}
        selectionMode={selectionMode}
        disabled={isDisabled}
        onojSelect={handleSelect}
        onojInvalidSelect={handleInvalidSelect}
      ></oj-file-picker>

      <div class="oj-sm-padding-1x-top"></div>

      <oj-checkboxset
        id="selection"
        aria-label="Mulitple selection"
        value={multipleSelection}
        onvalueChanged={handleMultipleChange}
      >
        <oj-option id="multipleSelect" value="multiple">
          Select Multiple
        </oj-option>
      </oj-checkboxset>

      <div class="oj-sm-padding-1x-top"></div>

      <oj-checkboxset
        id="disabled"
        aria-label="Disabled"
        value={disabledSelection}
        onvalueChanged={handleDisabledChange}
      >
        <oj-option id="disable" value="disable">
          Disable
        </oj-option>
      </oj-checkboxset>

      <oj-label for="acceptFld">Accept</oj-label>
      <oj-text-area
        id="acceptFld"
        rows={3}
        value={acceptInput}
        onvalueChanged={(event) => {
          const nextValue = event.detail.value ?? "";
          setAcceptInput(nextValue);
        }}
      ></oj-text-area>

      <div class="oj-sm-padding-1x-top">
        Selected files:{" "}
        <span>
          {selectedFiles.length > 0 ? selectedFiles.map((file) => file.name).join(", ") : "None"}
        </span>
      </div>

      <div class="oj-sm-padding-1x-top">
        Invalid Message Content: <span>{invalidMessage}</span>
      </div>
    </div>
  );
};

export default FilePicker;
