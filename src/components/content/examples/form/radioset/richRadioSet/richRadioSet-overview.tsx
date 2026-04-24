import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/rich-radioset";
import {
  extendedIndustryOptions,
  industryOptions,
  messageSets,
  type RichRadiosetValueChangedEvent,
} from "./richRadioSet-shared";

const toValueHandler =
  (setValue: (value: string | null) => void) =>
  (event: RichRadiosetValueChangedEvent) => {
    setValue((event.detail.value as string | null) ?? null);
  };

export default function RichRadioSetOverviewExample() {
  const [statesValue, setStatesValue] = useState<string | null>("automotive");
  const [labelEdgeValue, setLabelEdgeValue] =
    useState<string | null>("automotive");
  const [helpValue, setHelpValue] = useState<string | null>("automotive");
  const [messagesValue, setMessagesValue] =
    useState<string | null>("automotive");
  const [layoutsValue, setLayoutsValue] =
    useState<string | null>("automotive");

  const handleStatesChanged = useCallback(toValueHandler(setStatesValue), []);
  const handleLabelEdgeChanged = useCallback(
    toValueHandler(setLabelEdgeValue),
    [],
  );
  const handleHelpChanged = useCallback(toValueHandler(setHelpValue), []);
  const handleMessagesChanged = useCallback(
    toValueHandler(setMessagesValue),
    [],
  );
  const handleLayoutsChanged = useCallback(toValueHandler(setLayoutsValue), []);

  return (
    <div id="richRadiosetOverview">
      <h5>States</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="md"
          id="enabledRadioset"
          value={statesValue}
          options={industryOptions}
          labelHint="Enabled"
          onvalueChanged={handleStatesChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          id="disabledRadioset"
          value={statesValue}
          labelHint="Disabled"
          options={industryOptions}
          disabled
        />
        <oj-c-rich-radioset
          layout="md"
          id="readonlyRadioset"
          value={statesValue}
          labelHint="Readonly"
          options={industryOptions}
          readonly
        />
      </oj-c-form-layout>

      <h5>Label Edge</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="md"
          id="labelEdgeInside"
          value={labelEdgeValue}
          labelHint="Label Edge Inside"
          options={industryOptions}
          onvalueChanged={handleLabelEdgeChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          id="labelEdgeTop"
          value={labelEdgeValue}
          labelHint="Label Edge Top"
          labelEdge="top"
          options={industryOptions}
          onvalueChanged={handleLabelEdgeChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          id="labelEdgeStart"
          value={labelEdgeValue}
          labelHint="Label Edge Start"
          labelEdge="start"
          options={industryOptions}
          onvalueChanged={handleLabelEdgeChanged}
        />
      </oj-c-form-layout>

      <h5>Required &amp; Help</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="md"
          required
          options={industryOptions}
          labelHint="Required"
        />
        <oj-c-rich-radioset
          layout="md"
          value={helpValue}
          help={{ instruction: "help.instruction text" }}
          options={industryOptions}
          labelHint="Help Instruction"
          onvalueChanged={handleHelpChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          value={helpValue}
          helpHints={{ definition: "help-hints.definition text" }}
          options={industryOptions}
          labelHint="Help-hints Definition"
          onvalueChanged={handleHelpChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          value={helpValue}
          helpHints={{ source: "https://www.oracle.com", sourceText: "Learn More" }}
          options={industryOptions}
          labelHint="Help-hints Source"
          onvalueChanged={handleHelpChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Messages</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messageSets.error}
          value={messagesValue}
          options={industryOptions}
          labelHint="Error"
          onvalueChanged={handleMessagesChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messageSets.warning}
          value={messagesValue}
          options={industryOptions}
          labelHint="Warning"
          onvalueChanged={handleMessagesChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messageSets.info}
          value={messagesValue}
          options={industryOptions}
          labelHint="Information"
          onvalueChanged={handleMessagesChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messageSets.confirmation}
          value={messagesValue}
          options={industryOptions}
          labelHint="Confirmation"
          onvalueChanged={handleMessagesChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Layouts</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="xl"
          value={layoutsValue}
          options={extendedIndustryOptions}
          labelHint="XL Layout"
          onvalueChanged={handleLayoutsChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          value={layoutsValue}
          options={extendedIndustryOptions}
          labelHint="MD Layout"
          onvalueChanged={handleLayoutsChanged}
        />
        <oj-c-rich-radioset
          layout="sm"
          value={layoutsValue}
          options={extendedIndustryOptions}
          labelHint="SM Layout"
          onvalueChanged={handleLayoutsChanged}
        />
      </oj-c-form-layout>
    </div>
  );
}
