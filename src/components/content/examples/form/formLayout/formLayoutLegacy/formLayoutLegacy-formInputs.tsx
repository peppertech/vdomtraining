import { ComponentProps, h } from "preact";
import { useMemo, useState } from "preact/hooks";
import Color = require("ojs/ojcolor");
import Message = require("ojs/ojmessaging");
import "ojs/ojcheckboxset";
import "ojs/ojcollapsible";
import "ojs/ojcolorspectrum";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojinputtext";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectcombobox";
import "ojs/ojselectsingle";
import "ojs/ojslider";
import "ojs/ojswitch";
import {
  browserOptions,
  colorOptions,
  columnOptions,
  controlStateOptions,
  createDataProvider,
  directionOptions,
  formStateOptions,
  getLegacySelectManyValue,
  getLegacyTextValue,
  labelEdgeOptions,
  maxColumnOptions,
  todayIsoDate,
  todayIsoDateTime,
  valueLengthOptions,
  type LabelEdge,
} from "./formLayoutLegacy-shared";

type InputTextProps = ComponentProps<"oj-input-text">;

const userAssistanceDensityOptions: { value: "compact" | "efficient" | "reflow"; label: string }[] = [
  { value: "compact", label: "compact" },
  { value: "efficient", label: "efficient" },
  { value: "reflow", label: "reflow" },
];

const userAssistanceOptions = [
  { value: "placeholder", label: "Placeholder" },
  { value: "required", label: "Required" },
  { value: "definition", label: "help-hints.definition" },
  { value: "source", label: "help-hints.source" },
  { value: "instruction", label: "help.instruction" },
];

const messageOptions = [
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
  { value: "confirmation", label: "Confirmation" },
];

const labelLengthOptions = [
  { value: "long", label: "Long Labels" },
  { value: "short", label: "Short Labels" },
];

const readonlyAssistanceOptions = [
  { value: "none", label: "none" },
  {
    value: "confirmationAndInfoMessages",
    label: "confirmationAndInfoMessages",
  },
];

const styleOptions = [
  { value: "oj-helper-margin-auto", label: "oj-helper-margin-auto" },
  { value: "oj-formlayout-full-width", label: "oj-formlayout-full-width" },
];

const createMessages = (selected: string[]): Message[] => {
  const allMessages: Record<string, Message> = {
    error: {
      severity: "error",
      summary: "Error summary",
      detail: "Error detail",
    },
    warning: {
      severity: "warning",
      summary: "Warning summary",
      detail: "Warning detail",
    },
    info: {
      severity: "info",
      summary: "Info summary",
      detail: "Info detail",
    },
    confirmation: {
      severity: "confirmation",
      summary: "Confirmation summary",
      detail: "Confirmation detail",
    },
  };

  return selected
    .map((key) => allMessages[key])
    .filter((message): message is Message => Boolean(message));
};

const getLabel = (isLong: boolean, shortLabel: string, longLabel: string) =>
  isLong ? longLabel : shortLabel;

export default function FormLayoutLegacyFormInputsExample() {
  const browserProvider = useMemo(() => createDataProvider(browserOptions), []);
  const [labelEdge, setLabelEdge] = useState<LabelEdge>("inside");
  const [direction, setDirection] = useState<"row" | "column">("row");
  const [columnsString, setColumnsString] = useState("0");
  const [maxColumnsString, setMaxColumnsString] = useState("1");
  const [formState, setFormState] = useState("enabled");
  const [userAssistanceDensity, setUserAssistanceDensity] = useState<
    "compact" | "efficient" | "reflow"
  >("efficient");
  const [stylesBooleans, setStylesBooleans] = useState<string[]>([]);

  const [valueLength, setValueLength] = useState("short");
  const [userAssistanceBooleans, setUserAssistanceBooleans] = useState<
    string[]
  >([]);
  const [formControlMessages, setFormControlMessages] = useState<string[]>([]);
  const [labelLength, setLabelLength] = useState("short");
  const [controlsState, setControlsState] = useState("enabled");
  const [readonlyUserAssistanceShown, setReadonlyUserAssistanceShown] =
    useState("none");

  const readonlyFormLayout = formState === "readonly";
  const disableFormControls = controlsState === "disabled";
  const readonlyFormControls =
    controlsState === "readonly" || readonlyFormLayout;
  const showValue = valueLength !== "none";
  const longLabels = labelLength === "long";
  const placeholder = userAssistanceBooleans.includes("placeholder")
    ? "placeholder text"
    : undefined;
  const required = userAssistanceBooleans.includes("required");
  const definition =
    labelEdge !== "inside" && userAssistanceBooleans.includes("definition")
      ? "Custom help definition"
      : undefined;
  const source =
    labelEdge !== "inside" && userAssistanceBooleans.includes("source")
      ? "https://www.oracle.com"
      : undefined;
  const instruction = userAssistanceBooleans.includes("instruction")
    ? "Assistive help instruction"
    : undefined;
  const messages = useMemo(
    () => createMessages(formControlMessages),
    [formControlMessages],
  );
  const helpHints: InputTextProps["helpHints"] =
    definition || source
      ? {
          definition,
          source,
        }
      : undefined;
  const help = instruction ? { instruction } : undefined;
  const layoutClass = stylesBooleans.join(" ").trim() || undefined;

  const inputTextValue = getLegacyTextValue(
    valueLength,
    "This is a form layout example.",
  );
  const inputPasswordValue = getLegacyTextValue(valueLength, "secret123");
  const inputNumberValue =
    valueLength === "none" ? null : valueLength === "long" ? 123456789.45 : 10;
  const inputDateValue = showValue ? todayIsoDate : undefined;
  const inputTimeValue = showValue ? todayIsoDateTime : undefined;
  const inputDateTimeValue = showValue ? todayIsoDate : undefined;
  const selectSingleValue =
    valueLength === "none"
      ? null
      : valueLength === "long"
        ? "IE"
        : "CH";
  const comboValue =
    valueLength === "none"
      ? null
      : valueLength === "long"
        ? "Internet Explorer"
        : "Chrome";
  const selectManyValue = getLegacySelectManyValue(valueLength);
  const comboboxManyValue = getLegacySelectManyValue(valueLength);
  const textAreaValue = getLegacyTextValue(
    valueLength,
    "textarea is a field that has rows so users can view more content without scrolling.",
  );
  const textAreaGrowingValue = getLegacyTextValue(
    valueLength,
    "textarea with max-rows=-1 continues to grow as content increases.",
  );
  const radioValue = showValue ? "blue" : null;
  const checkboxValue = showValue ? ["blue"] : [];
  const agreeValue = showValue ? ["agree"] : [];
  const colorSpectrumValue = useMemo(
    () => new Color("rgba(21,0,255,0.8)"),
    [],
  );

  return (
    <div
      id="legacyFormLayoutOverview"
      class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x"
    >
      <oj-collapsible expanded={true}>
        <h6 slot="header">Options To Control The Form Layout Below</h6>
        <div class="oj-panel oj-bg-info-30">
          <oj-form-layout
            id="legacyFormLayoutOptions"
            maxColumns={4}
            direction="row"
            userAssistanceDensity="compact"
          >
            <oj-radioset
              labelHint="Label Edge"
              value={labelEdge}
              onvalueChanged={(event) => {
                setLabelEdge(event.detail.value as LabelEdge);
              }}
              options={createDataProvider(labelEdgeOptions)}
            />
            <oj-radioset
              labelHint="Direction"
              value={direction}
              onvalueChanged={(event) => {
                setDirection(event.detail.value as "row" | "column");
              }}
              options={createDataProvider(directionOptions)}
            />
            <oj-radioset
              labelHint="Columns"
              value={columnsString}
              onvalueChanged={(event) => {
                setColumnsString(String(event.detail.value));
              }}
              options={createDataProvider(columnOptions)}
            />
            <oj-radioset
              labelHint="Max Columns"
              value={maxColumnsString}
              onvalueChanged={(event) => {
                setMaxColumnsString(String(event.detail.value));
              }}
              options={createDataProvider(maxColumnOptions)}
            />
            <oj-radioset
              labelHint="State"
              value={formState}
              disabled={controlsState === "disabled"}
              onvalueChanged={(event) => {
                setFormState(String(event.detail.value));
              }}
              options={createDataProvider(formStateOptions)}
            />
            <oj-radioset
              labelHint="User Assistance Density"
              value={userAssistanceDensity}
              onvalueChanged={(event) => {
                setUserAssistanceDensity(
                  event.detail.value as "compact" | "efficient" | "reflow",
                );
              }}
              options={createDataProvider(userAssistanceDensityOptions)}
            />
            <oj-checkboxset
              labelHint="Classes"
              value={stylesBooleans}
              onvalueChanged={(event) => {
                setStylesBooleans((event.detail.value as string[]) ?? []);
              }}
            >
              {styleOptions.map((item) => (
                <oj-option key={item.value} value={item.value}>
                  {item.label}
                </oj-option>
              ))}
            </oj-checkboxset>
          </oj-form-layout>
        </div>
      </oj-collapsible>

      <oj-collapsible expanded={true}>
        <h6 slot="header">Options To Control the Form Controls Below</h6>
        <div class="oj-panel oj-bg-info-30">
          <oj-form-layout
            id="legacyFormControlOptions"
            maxColumns={4}
            direction="row"
            userAssistanceDensity="compact"
          >
            <oj-radioset
              labelHint="Value"
              value={valueLength}
              onvalueChanged={(event) => {
                setValueLength(String(event.detail.value));
              }}
              options={createDataProvider(valueLengthOptions)}
            />
            <oj-checkboxset
              labelHint="User Assistance"
              value={userAssistanceBooleans}
              onvalueChanged={(event) => {
                setUserAssistanceBooleans(
                  (event.detail.value as string[]) ?? [],
                );
              }}
            >
              {userAssistanceOptions.map((item) => (
                <oj-option
                  key={item.value}
                  value={item.value}
                  disabled={
                    labelEdge === "inside" &&
                    (item.value === "definition" || item.value === "source")
                  }
                >
                  {item.label}
                </oj-option>
              ))}
            </oj-checkboxset>
            <oj-checkboxset
              labelHint="Messages"
              value={formControlMessages}
              onvalueChanged={(event) => {
                setFormControlMessages((event.detail.value as string[]) ?? []);
              }}
            >
              {messageOptions.map((item) => (
                <oj-option key={item.value} value={item.value}>
                  {item.label}
                </oj-option>
              ))}
            </oj-checkboxset>
            <oj-radioset
              labelHint="Labels"
              value={labelLength}
              onvalueChanged={(event) => {
                setLabelLength(String(event.detail.value));
              }}
              options={createDataProvider(labelLengthOptions)}
            />
            <oj-radioset
              labelHint="State"
              value={controlsState}
              disabled={readonlyFormLayout}
              onvalueChanged={(event) => {
                setControlsState(String(event.detail.value));
              }}
              options={createDataProvider(controlStateOptions)}
            />
            <oj-radioset
              labelHint="readonlyUserAssistanceShown"
              value={readonlyUserAssistanceShown}
              onvalueChanged={(event) => {
                setReadonlyUserAssistanceShown(String(event.detail.value));
              }}
              options={createDataProvider(readonlyAssistanceOptions)}
            />
          </oj-form-layout>
        </div>
      </oj-collapsible>

      <oj-form-layout
        id="legacyFormLayoutOverviewForm"
        class={layoutClass}
        labelEdge={labelEdge}
        columns={parseInt(columnsString, 10)}
        maxColumns={parseInt(maxColumnsString, 10)}
        direction={direction}
        readonly={readonlyFormLayout}
        userAssistanceDensity={userAssistanceDensity}
      >
        <oj-input-text
          labelHint={getLabel(longLabels, "Input Text", "Long Label Input Text")}
          placeholder={placeholder}
          value={inputTextValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-input-password
          labelHint={getLabel(
            longLabels,
            "Input Password",
            "Long Label Input Password",
          )}
          placeholder={placeholder}
          value={inputPasswordValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
          maskIcon="visible"
        />
        <oj-input-number
          labelHint={getLabel(
            longLabels,
            "Input Number",
            "Long Label Input Number",
          )}
          max={100}
          min={0}
          step={10}
          placeholder={placeholder}
          value={inputNumberValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-input-date
          labelHint={getLabel(longLabels, "Input Date", "Long Label Input Date")}
          value={inputDateValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-input-time
          labelHint={getLabel(longLabels, "Input Time", "Long Label Input Time")}
          value={inputTimeValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-input-date-time
          labelHint={getLabel(
            longLabels,
            "Input Date Time",
            "Long Label Input Date Time",
          )}
          value={inputDateTimeValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-select-single
          labelHint={getLabel(
            longLabels,
            "Select Single",
            "Long Label Select Single",
          )}
          placeholder={placeholder}
          data={browserProvider}
          value={selectSingleValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-combobox-one
          labelHint={getLabel(
            longLabels,
            "Combobox One",
            "Long Label Combobox One",
          )}
          placeholder={placeholder}
          value={comboValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        >
          <oj-option value="Internet Explorer">Windows10InternetExplorer</oj-option>
          <oj-option value="Firefox">Android 11 Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows 10 Opera</oj-option>
          <oj-option value="Safari">iOS iPhone 11 Pro Safari</oj-option>
        </oj-combobox-one>
        <oj-select-many
          labelHint={getLabel(
            longLabels,
            "Select Many",
            "Long Label Select Many",
          )}
          placeholder={placeholder}
          value={selectManyValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        >
          <oj-option value="Internet Explorer">Windows10InternetExplorer</oj-option>
          <oj-option value="Firefox">Android 11 Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows 10 Opera</oj-option>
          <oj-option value="Safari">iOS iPhone 11 Pro Safari</oj-option>
        </oj-select-many>
        <oj-combobox-many
          labelHint={getLabel(
            longLabels,
            "Combobox Many",
            "Long Label Combobox Many",
          )}
          placeholder={placeholder}
          value={comboboxManyValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        >
          <oj-option value="Internet Explorer">Windows10InternetExplorer</oj-option>
          <oj-option value="Firefox">Android 11 Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows 10 Opera</oj-option>
          <oj-option value="Safari">iOS iPhone 11 Pro Safari</oj-option>
        </oj-combobox-many>
        <oj-text-area
          labelHint={getLabel(longLabels, "Text Area", "Long Label Text Area")}
          rows={4}
          placeholder={placeholder}
          value={textAreaValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-text-area
          labelHint={getLabel(
            longLabels,
            "Text Area Grow",
            "Long Label Text Area Grow",
          )}
          maxRows={-1}
          placeholder={placeholder}
          value={textAreaGrowingValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        />
        <oj-slider
          labelHint={getLabel(longLabels, "Slider", "Long Label Slider")}
          value={20}
          max={100}
          min={0}
          step={1}
          disabled={disableFormControls}
          messagesCustom={messages}
          helpHints={helpHints}
          help={help}
        />
        <oj-range-slider
          labelHint={getLabel(
            longLabels,
            "Range Slider",
            "Long Label Range Slider",
          )}
          value={{ start: 10, end: 50 }}
          max={100}
          min={0}
          step={1}
          disabled={disableFormControls}
          messagesCustom={messages}
          helpHints={helpHints}
          help={help}
        />
        <oj-switch
          labelHint={getLabel(longLabels, "Switch", "Long Label Switch")}
          value={true}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          helpHints={helpHints}
          help={help}
        />
        <oj-radioset
          labelHint={getLabel(longLabels, "Radioset", "Long Label Radioset")}
          value={radioValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        >
          {colorOptions.map((item) => (
            <oj-option key={item.value} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-radioset>
        <oj-checkboxset
          labelHint={getLabel(
            longLabels,
            "Checkboxset",
            "Long Label Checkboxset",
          )}
          value={checkboxValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        >
          {colorOptions.map((item) => (
            <oj-option key={item.value} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-checkboxset>
        <oj-checkboxset
          labelHint={getLabel(longLabels, "Checkbox", "Long Label Checkbox")}
          value={agreeValue}
          disabled={disableFormControls}
          readonly={readonlyFormControls}
          messagesCustom={messages}
          readonlyUserAssistanceShown={readonlyUserAssistanceShown as any}
          required={required}
          helpHints={helpHints}
          help={help}
        >
          <oj-option value="agree">Agree</oj-option>
        </oj-checkboxset>
      </oj-form-layout>

      <hr />

      <h6>Controls not frequently used in a form layout</h6>

      <oj-form-layout
        id="legacyFormLayoutOverviewSecondary"
        class={layoutClass}
        labelEdge={labelEdge}
        columns={parseInt(columnsString, 10)}
        maxColumns={parseInt(maxColumnsString, 10)}
        direction={direction}
        readonly={readonlyFormLayout}
        userAssistanceDensity={userAssistanceDensity}
      >
        <oj-color-spectrum
          labelHint={getLabel(
            longLabels,
            "Color Spectrum",
            "Long Label Color Spectrum",
          )}
          value={colorSpectrumValue}
          disabled={disableFormControls}
          helpHints={helpHints}
          help={help}
        />
      </oj-form-layout>
    </div>
  );
}
