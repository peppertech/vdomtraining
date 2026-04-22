import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojcheckboxset";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import "ojs/ojinputtext";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectcombobox";
import "ojs/ojselectsingle";
import {
  browserOptions,
  colorOptions,
  createDataProvider,
  getLegacySelectManyValue,
  getLegacyTextValue,
  labelEdgeOptions,
  todayIsoDate,
  todayIsoDateTime,
  valueLengthOptions,
  type LabelEdge,
} from "./formLayoutLegacy-shared";

export default function FormLayoutLegacyFormInputsMixedExample() {
  const browserProvider = useMemo(() => createDataProvider(browserOptions), []);
  const [labelEdge, setLabelEdge] = useState<LabelEdge>("inside");
  const [valueLength, setValueLength] = useState("short");

  const inputTextValue = getLegacyTextValue(valueLength, "text");
  const inputPasswordValue = getLegacyTextValue(valueLength, "secret123");
  const textAreaValue = getLegacyTextValue(
    valueLength,
    "textarea is a field that has rows so users can view more content without scrolling.",
  );
  const inputNumberValue =
    valueLength === "none" ? null : valueLength === "long" ? 123456789.45 : 10;
  const comboValue =
    valueLength === "none"
      ? null
      : valueLength === "long"
        ? "Internet Explorer"
        : "Chrome";
  const selectManyValue = getLegacySelectManyValue(valueLength);
  const selectSingleValue =
    valueLength === "none"
      ? null
      : valueLength === "long"
        ? "IE"
        : "CH";

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout maxColumns={4} direction="row">
          <oj-radioset
            value={labelEdge}
            labelHint="Label Edge"
            options={createDataProvider(labelEdgeOptions)}
            onvalueChanged={(event) => {
              setLabelEdge(event.detail.value as LabelEdge);
            }}
          />
          <oj-radioset
            value={valueLength}
            labelHint="Value"
            options={createDataProvider(valueLengthOptions)}
            onvalueChanged={(event) => {
              setValueLength(String(event.detail.value));
            }}
          />
        </oj-form-layout>
      </div>

      <oj-form-layout id="legacyMixedFormLayout" labelEdge={labelEdge} maxColumns={2} direction="row">
        <oj-input-text labelHint="input text" value={inputTextValue} />
        <oj-input-text labelHint="readonly input text" value={inputTextValue} readonly={true} />

        <oj-input-password labelHint="input password" value={inputPasswordValue} maskIcon="visible" />
        <oj-input-password
          labelHint="readonly input password"
          value={inputPasswordValue}
          readonly={true}
          maskIcon="visible"
        />

        <oj-text-area labelHint="textarea rows 3" rows={3} value={textAreaValue} />
        <oj-text-area
          labelHint="readonly textarea rows 3"
          rows={3}
          value={textAreaValue}
          readonly={true}
        />

        <oj-input-number labelHint="input number" value={inputNumberValue} />
        <oj-input-number
          labelHint="readonly input number"
          value={inputNumberValue}
          readonly={true}
        />

        <oj-input-date labelHint="input date" value={valueLength === "none" ? undefined : todayIsoDate} />
        <oj-input-date
          labelHint="readonly input date"
          value={valueLength === "none" ? undefined : todayIsoDate}
          readonly={true}
        />

        <oj-input-time
          labelHint="input time"
          value={valueLength === "none" ? undefined : todayIsoDateTime}
        />
        <oj-input-time
          labelHint="readonly input time"
          value={valueLength === "none" ? undefined : todayIsoDateTime}
          readonly={true}
        />

        <oj-select-single
          labelHint="select single"
          data={browserProvider}
          value={selectSingleValue}
        />
        <oj-select-single
          labelHint="readonly select single"
          data={browserProvider}
          value={selectSingleValue}
          readonly={true}
        />

        <oj-combobox-one labelHint="combobox one" value={comboValue}>
          <oj-option value="Internet Explorer">Windows Internet Explorer</oj-option>
          <oj-option value="Firefox">Android Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows Opera</oj-option>
          <oj-option value="Safari">iOS Safari</oj-option>
        </oj-combobox-one>
        <oj-combobox-one labelHint="readonly combobox one" value={comboValue} readonly={true}>
          <oj-option value="Internet Explorer">Windows Internet Explorer</oj-option>
          <oj-option value="Firefox">Android Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows Opera</oj-option>
          <oj-option value="Safari">iOS Safari</oj-option>
        </oj-combobox-one>

        <oj-select-many labelHint="select many" value={selectManyValue}>
          <oj-option value="Internet Explorer">Windows Internet Explorer</oj-option>
          <oj-option value="Firefox">Android Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows Opera</oj-option>
          <oj-option value="Safari">iOS Safari</oj-option>
        </oj-select-many>
        <oj-select-many labelHint="readonly select many" value={selectManyValue} readonly={true}>
          <oj-option value="Internet Explorer">Windows Internet Explorer</oj-option>
          <oj-option value="Firefox">Android Firefox</oj-option>
          <oj-option value="Chrome">Chrome</oj-option>
          <oj-option value="Opera">Windows Opera</oj-option>
          <oj-option value="Safari">iOS Safari</oj-option>
        </oj-select-many>

        <oj-radioset labelHint="radioset" value={valueLength === "none" ? null : "blue"}>
          {colorOptions.map((item) => (
            <oj-option key={item.value} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-radioset>
        <oj-radioset
          labelHint="readonly radioset"
          value={valueLength === "none" ? null : "blue"}
          readonly={true}
        >
          {colorOptions.map((item) => (
            <oj-option key={item.value} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-radioset>

        <oj-checkboxset labelHint="checkboxset" value={valueLength === "none" ? [] : ["blue"]}>
          {colorOptions.map((item) => (
            <oj-option key={item.value} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-checkboxset>
        <oj-checkboxset
          labelHint="readonly checkboxset"
          value={valueLength === "none" ? [] : ["blue"]}
          readonly={true}
        >
          {colorOptions.map((item) => (
            <oj-option key={item.value} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-checkboxset>
      </oj-form-layout>
    </div>
  );
}
