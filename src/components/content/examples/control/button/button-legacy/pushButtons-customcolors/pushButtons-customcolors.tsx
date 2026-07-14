import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojoption';
import 'preact';
import { type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type CheckboxsetValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];

export const PushButtonsCustomcolors = () => {
  const [disabledValue, setDisabledValue] = useState<CheckboxsetValue>([]);
  const disableControls = disabledValue.includes('true');

  const handleDisabledValueValueChanged = (event: CheckboxsetValueChangedEvent) => {
    setDisabledValue((event.detail.value ?? []) as CheckboxsetValue);
  };

  return (
      <div id="button-container">
            <oj-checkboxset id="disabledControls" onvalueChanged={handleDisabledValueValueChanged} value={disabledValue}><oj-option value="true">Disable examples</oj-option></oj-checkboxset>
            <table class="demo-recipe-table demo-recipe-spacing" aria-label="Buttons with custom colors">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">
                                                        Regular buttons
                                                        <div>(for comparison)</div>
                                                    </th>
                                          <th scope="col">
                                                        Purple buttons
                                                        <div><code class="demo-selectornames">demo-button-purple</code></div>
                                                    </th>
                                      </tr>
                              <tr>
                                          <th scope="row">Solid Buttons</th>
                                          <td>
                                                        <oj-button chroming="solid" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-clock" />
                                                                        Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button class="demo-button-purple" chroming="solid" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-clock" />
                                                                        Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Outlined Buttons</th>
                                          <td>
                                                        <oj-button chroming="outlined" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-clock" />
                                                                        Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button class="demo-button-purple" chroming="outlined" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-clock" />
                                                                        Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Borderless Buttons</th>
                                          <td>
                                                        <oj-button chroming="borderless" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-clock" />
                                                                        Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button class="demo-button-purple" chroming="borderless" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-clock" />
                                                                        Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
        </div>
    );
};

export default PushButtonsCustomcolors;
