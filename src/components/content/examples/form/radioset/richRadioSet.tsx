import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/rich-radioset";

import { CRichRadiosetElement } from "oj-c/rich-radioset";
import { ojMessage } from "ojs/ojmessage";

type RichRadioOption = {
  value: string;
  label: string;
  secondaryText: string;
  thumbnailSrc: string;
};

const useIndustryOptions = () =>
  useMemo<RichRadioOption[]>(
    () => [
      {
        value: "automotive",
        label: "Automotive",
        secondaryText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/automotive.jpg",
      },
      {
        value: "communications",
        label: "Communications",
        secondaryText:
          "Proin mauris ipsum, efficitur at dui ut, auctor iaculis felis.",
        thumbnailSrc: "../../../../styles/images/formControls/communications.jpg",
      },
      {
        value: "construction",
        label: "Construction",
        secondaryText:
          "Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/construction.jpg",
      },
    ],
    [],
  );

const useHelpOptions = () =>
  useMemo<RichRadioOption[]>(
    () => [
      {
        value: "distribution",
        label: "Distribution",
        secondaryText:
          "Maecenas urna augue, tempus vitae fringilla in, cursus sit amet magna. Praesent blandit nibh metus, id varius velit varius eget.",
        thumbnailSrc: "../../../../styles/images/formControls/distribution.jpg",
      },
      {
        value: "education",
        label: "Education",
        secondaryText:
          "Cras cursus, mi quis tincidunt tincidunt, augue dolor consequat mauris, iaculis sollicitudin ante purus eu eros.",
        thumbnailSrc: "../../../../styles/images/formControls/education.jpg",
      },
      {
        value: "travel",
        label: "Travel",
        secondaryText:
          "Fusce at nunc vehicula, viverra arcu vel, eleifend odio.",
        thumbnailSrc: "../../../../styles/images/formControls/travel.jpg",
      },
    ],
    [],
  );

const useWrappingOptions = () =>
  useMemo<RichRadioOption[]>(
    () => [
      {
        value: "automotive",
        label: "Automotive",
        secondaryText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/automotive.jpg",
      },
      {
        value: "communications",
        label: "Communications",
        secondaryText:
          "Proin mauris ipsum, efficitur at dui ut, auctor iaculis felis.",
        thumbnailSrc: "../../../../styles/images/formControls/communications.jpg",
      },
      {
        value: "construction",
        label: "Construction",
        secondaryText:
          "Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/construction.jpg",
      },
      {
        value: "travel",
        label: "Travel",
        secondaryText:
          "Fusce at nunc vehicula, viverra arcu vel, eleifend odio.",
        thumbnailSrc: "../../../../styles/images/formControls/travel.jpg",
      },
    ],
    [],
  );

const useMessageSets = () =>
  useMemo(() => {
    return {
      error: [
        {
          severity: "error" as const,
          summary: "Error",
          detail: "An error occurred. Resolve the issue to continue.",
        },
      ],
      warning: [
        {
          severity: "warning" as const,
          summary: "Warning",
          detail: "Review this choice before committing.",
        },
      ],
      info: [
        {
          severity: "info" as const,
          summary: "Information",
          detail: "Additional context is available for this selection.",
        },
      ],
      confirmation: [
        {
          severity: "confirmation" as const,
          summary: "Confirmation",
          detail: "Selection recorded successfully.",
        },
      ],
    };
  }, []);

const handleValueChangedFactory =
  (setValue: (value: string[]) => void) =>
  (event: CustomEvent<{ value: string | string[] }>) => {
    const next = event.detail.value;
    setValue(Array.isArray(next) ? next : [next]);
  };

export const RadiosetCorePackExample = () => {
  const [value, setValue] = useState<string[]>(["automotive"]);

  const industryOptions = useIndustryOptions();
  const helpOptions = useHelpOptions();
  const wrappingOptions = useWrappingOptions();
  const messages = useMessageSets();
  //const optionsRadioset: CRichRadiosetElement<string>['options'] = industryOptions;

  const handleValueChanged = useCallback(handleValueChangedFactory(setValue), []);

  return (
    <div id="div1">
      <h5>States</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="md"
          id="enabledRadioset"
          value={value}
          options={industryOptions}
          labelHint="Enabled"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          id="disabledRadioset"
          value={value}
          labelHint="Disabled"
          options={industryOptions}
          disabled
        />
        <oj-c-rich-radioset
          layout="md"
          id="readonlyRadioset"
          value={value}
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
          value={value}
          labelHint="Label Edge Inside"
          options={industryOptions}
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          id="labelEdgeTop"
          value={value}
          labelHint="Label Edge Top"
          labelEdge="top"
          options={industryOptions}
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          id="labelEdgeStart"
          value={value}
          labelHint="Label Edge Start"
          labelEdge="start"
          options={industryOptions}
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>

      <h5>Required &amp; Help</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset layout="md" required options={helpOptions} labelHint="Required" />
        <oj-c-rich-radioset
          layout="md"
          value={value}
          help={{ instruction: "help.instruction text" }}
          options={helpOptions}
          labelHint="Help Instruction"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          value={value}
          helpHints={{ definition: "help-hints.definition text" }}
          options={helpOptions}
          labelHint="Help-hints Definition"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          value={value}
          helpHints={{ source: "https://www.oracle.com", sourceText: "Learn More" }}
          options={helpOptions}
          labelHint="Help-hints Source"
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Messages</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messages.error}
          value={value}
          options={industryOptions}
          labelHint="Error"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messages.warning}
          value={value}
          options={industryOptions}
          labelHint="Warning"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messages.info}
          value={value}
          options={industryOptions}
          labelHint="Information"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          messagesCustom={messages.confirmation}
          value={value}
          options={industryOptions}
          labelHint="Confirmation"
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Layouts</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-radioset
          layout="xl"
          value={value}
          options={industryOptions}
          labelHint="XL Layout"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="md"
          value={value}
          options={industryOptions}
          labelHint="MD Layout"
          onvalueChanged={handleValueChanged}
        />
        <oj-c-rich-radioset
          layout="sm"
          value={value}
          options={industryOptions}
          labelHint="SM Layout"
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>
    </div>
  );
};

export default RadiosetCorePackExample;
