import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojoption';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

type CheckboxsetValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];

const DISABLED_OPTION = 'true';

export const PushButtonsAltcolors = () => {
  const [disabledValue, setDisabledValue] = useState<CheckboxsetValue>([]);

  const handleDisabledValueChanged = (event: CheckboxsetValueChangedEvent) => {
    setDisabledValue((event.detail.value ?? []) as CheckboxsetValue);
  };

  const disableControls = disabledValue.includes(DISABLED_OPTION);
  const isRedwood = useMemo(() => document.body.className.includes('redwood'), []);

  return (
    <div id="button-container">
      <oj-checkboxset
        id="disabledControls"
        value={disabledValue}
        onvalueChanged={handleDisabledValueChanged}
      >
        <oj-option value={DISABLED_OPTION}>Disable examples</oj-option>
      </oj-checkboxset>

      <table
        class="demo-recipe-table demo-recipe-spacing oj-sm-width-full"
        aria-label="alternate color buttons"
      >
        <thead>
          <tr>
            <th scope="col">Class</th>
            <th scope="col">Button</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">N/A default button</th>
            <td>
              <oj-button disabled={disableControls} chroming="solid">
                <span slot="startIcon" class="oj-ux-ico-clock" />
                Default
              </oj-button>
            </td>
          </tr>
          {!isRedwood ? (
            <tr>
              <th scope="row">
                <code class="demo-selectornames">oj-button-confirm</code>
              </th>
              <td>
                <oj-button disabled={disableControls} chroming="callToAction">
                  <span slot="startIcon" class="oj-fwk-icon oj-fwk-icon-clock" />
                  Confirm
                </oj-button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default PushButtonsAltcolors;
