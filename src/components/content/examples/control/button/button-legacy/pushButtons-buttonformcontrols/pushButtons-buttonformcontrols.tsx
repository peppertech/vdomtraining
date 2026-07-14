import 'ojs/ojbutton';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojdatetimepicker';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojoption';
import 'ojs/ojselectcombobox';
import 'ojs/ojselectsingle';
import 'ojs/ojslider';
import 'ojs/ojswitch';
import 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type BrowserOption = {
  value: string;
  label: string;
};

const browserOptions: BrowserOption[] = [
  { value: 'IE', label: 'Internet Explorer' },
  { value: 'FF', label: 'Firefox' },
  { value: 'CH', label: 'Chrome' },
  { value: 'OP', label: 'Opera' },
  { value: 'SA', label: 'Safari' }
];

const comboboxBrowsers = [
  'Internet Explorer',
  'Firefox',
  'Chrome',
  'Opera',
  'Safari'
] as const;

const renderButton = (slot?: 'value', large?: boolean) => (
  <oj-button slot={slot} chroming="outlined" class={large ? 'oj-button-lg' : undefined}>
    <span slot="startIcon" class="oj-ux-ico-plus" />
    button
  </oj-button>
);

const renderComboboxOneOptions = () =>
  comboboxBrowsers.map((browser) => <oj-option value={browser}>{browser}</oj-option>);

const renderComboboxManyOptions = () =>
  comboboxBrowsers.map((browser) => <oj-option value={browser}>{browser}</oj-option>);

const renderSelectManyOptions = () =>
  comboboxBrowsers.map((browser) => <oj-option value={browser}>{browser}</oj-option>);

export const PushButtonsButtonformcontrols = () => {
  const dateTimeValue = IntlConverterUtils.dateToLocalIso(new Date());
  const browsersDP = useMemo(
    () => new ArrayDataProvider<string, BrowserOption>(browserOptions, { keyAttributes: 'value' }),
    []
  );

  return (
    <div id="form-container">
      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel1">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value>
          <oj-label slot="label" labelId="grouplabel2">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-input-number
            slot="value"
            aria-label="input number"
            max={100}
            min={0}
            value={20}
            step={10}
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-input-number
        labelHint="inside label"
        labelEdge="inside"
        max={100}
        min={0}
        value={20}
        step={10}
        class="demo-form-control-max-width"
      />
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel3">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-input-date-time
            slot="value"
            labelHint="input datetime"
            labelEdge="none"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
            value={dateTimeValue}
          />
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-input-date-time
        labelHint="inside label"
        labelEdge="inside"
        class="demo-form-control-max-width"
        value={dateTimeValue}
      />
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel4">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-combobox-one
            slot="value"
            aria-label="combobox"
            value="Firefox"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          >
            {renderComboboxOneOptions()}
          </oj-combobox-one>
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-combobox-one
        labelHint="inside label"
        labelEdge="inside"
        value="Firefox"
        class="demo-form-control-max-width"
      >
        {renderComboboxOneOptions()}
      </oj-combobox-one>
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel5">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-combobox-many
            slot="value"
            aria-label="combobox multiple"
            value={['Safari']}
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          >
            {renderComboboxManyOptions()}
          </oj-combobox-many>
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-combobox-many
        labelHint="inside label"
        labelEdge="inside"
        value={['Safari']}
        class="demo-form-control-max-width"
      >
        {renderComboboxManyOptions()}
      </oj-combobox-many>
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel6">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-select-single
            slot="value"
            aria-label="select"
            value="CH"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
            data={browsersDP}
          />
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-select-single
        labelHint="inside label"
        labelEdge="inside"
        value="CH"
        class="demo-form-control-max-width"
        data={browsersDP}
      />
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel7">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-select-many
            slot="value"
            aria-label="select multiple"
            value={['Chrome']}
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          >
            {renderSelectManyOptions()}
          </oj-select-many>
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-select-many
        labelHint="inside label"
        labelEdge="inside"
        value={['Chrome']}
        class="demo-form-control-max-width"
      >
        {renderSelectManyOptions()}
      </oj-select-many>
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel8">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-slider
            slot="value"
            aria-label="slider"
            max={100}
            min={0}
            step={10}
            value={20}
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-slider
        labelHint="inside label"
        labelEdge="inside"
        max={100}
        min={0}
        step={10}
        value={20}
        class="demo-form-control-max-width"
      />
      {renderButton(undefined, true)}
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel9">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          />
          <oj-switch slot="value" class="oj-sm-padding-1x-end" aria-label="top label switch" />
          {renderButton('value')}
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      />
      <oj-switch labelHint="inside label" labelEdge="inside" />
      {renderButton(undefined, true)}
      <hr />
    </div>
  );
};

export default PushButtonsButtonformcontrols;
