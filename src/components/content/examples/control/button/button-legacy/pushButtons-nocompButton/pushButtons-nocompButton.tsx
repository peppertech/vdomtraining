import { h, type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojcheckboxset';
import 'ojs/ojoption';
import 'ojs/ojbutton';

type CheckboxsetValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type CheckboxsetValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>>[0];

export const PushButtonsNocompButton = () => {
  const [disabledValue, setDisabledValue] = useState<CheckboxsetValue>([]);
  const disableControls = disabledValue.includes('true');

  const handleDisabledValueChanged = (event: CheckboxsetValueChangedEvent) => {
    setDisabledValue((event.detail.value ?? []) as CheckboxsetValue);
  };
  return (
      <div id="button-container">
            <h3 class="oj-text-color-danger">This is an unpublished demo for verifying nocomp button interally</h3>
            <oj-checkboxset id="disabledControls" value={disabledValue} onvalueChanged={handleDisabledValueChanged}><oj-option value="true">Disable examples</oj-option></oj-checkboxset>
            <table class="demo-recipe-table demo-recipe-spacing" aria-label="nocomp buttons">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">Call To Action oj-buttons</th>
                                          <th scope="col">Call To Action nocomp-buttons</th>
                                          <th scope="col">Solid oj-buttons</th>
                                          <th scope="col">Solid nocomp-buttons</th>
                                          <th scope="col">Outlined oj-buttons</th>
                                          <th scope="col">Outlined nocomp-buttons</th>
                                          <th scope="col">Borderless oj-buttons</th>
                                          <th scope="col">Borderless nocomp-buttons</th>
                                      </tr>
                              <tr>
                                          <th scope="row">Text only</th>
                                          <td>
                                                        <oj-button id="button16" chroming="callToAction" disabled={disableControls}>Text Button</oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-cta-chrome oj-button-text-only" id="nocomp16" disabled={disableControls}>Text Button</button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button1" chroming="solid" disabled={disableControls}>Text Button</oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-solid-chrome oj-button-text-only" id="nocomp1" disabled={disableControls}>Text Button</button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button2" chroming="outlined" disabled={disableControls}>Text Button</oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-outlined-chrome oj-button-text-only" id="nocomp2" disabled={disableControls}>Text Button</button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button3" chroming="borderless" disabled={disableControls}>Text Button</oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-borderless-chrome oj-button-text-only" id="nocomp3" disabled={disableControls}>Text Button</button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Icon only</th>
                                          <td>
                                                        <oj-button id="button17" display="icons" chroming="callToAction" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-home" />
                                                                        Home
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-cta-chrome oj-button-icon-only" id="nocomp17" disabled={disableControls} title="Home"><span class="oj-ux-ico-home oj-button-icon oj-end" /></button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button4" display="icons" chroming="solid" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-home" />
                                                                        Home
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-solid-chrome oj-button-icon-only" id="nocomp4" disabled={disableControls} title="Home"><span class="oj-ux-ico-home oj-button-icon oj-end" /></button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button5" display="icons" chroming="outlined" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-home" />
                                                                        Home
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-outlined-chrome oj-button-icon-only" id="nocomp5" disabled={disableControls} title="Home"><span class="oj-ux-ico-home oj-button-icon oj-end" /></button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button6" display="icons" chroming="borderless" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-home" />
                                                                        Home
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-borderless-chrome oj-button-icon-only" id="nocomp6" disabled={disableControls} title="Home"><span class="oj-ux-ico-home oj-button-icon oj-end" /></button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Start Icon and Text</th>
                                          <td>
                                                        <oj-button id="button18" chroming="callToAction" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-cta-chrome oj-button-text-icon-start" id="nocomp18" disabled={disableControls}>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-start" />
                                                                        <span class="oj-button-text">Next</span>
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button7" chroming="solid" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-solid-chrome oj-button-text-icon-start" id="nocomp7" disabled={disableControls}>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-start" />
                                                                        <span class="oj-button-text">Next</span>
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button8" chroming="outlined" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-outlined-chrome oj-button-text-icon-start" id="nocomp8" disabled={disableControls}>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-start" />
                                                                        <span class="oj-button-text">Next</span>
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button9" chroming="borderless" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-borderless-chrome oj-button-text-icon-start" id="nocomp9" disabled={disableControls}>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-start" />
                                                                        <span class="oj-button-text">Next</span>
                                                                    </button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">End Icon and Text</th>
                                          <td>
                                                        <oj-button id="button19" chroming="callToAction" disabled={disableControls}>
                                                                        <span slot="endIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-cta-chrome oj-button-text-icon-end" id="nocomp19" disabled={disableControls}>
                                                                        <span class="oj-button-text">Next</span>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-end" />
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button10" chroming="solid" disabled={disableControls}>
                                                                        <span slot="endIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-solid-chrome oj-button-text-icon-end" id="nocomp10" disabled={disableControls}>
                                                                        <span class="oj-button-text">Next</span>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-end" />
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button11" chroming="outlined" disabled={disableControls}>
                                                                        <span slot="endIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-outlined-chrome oj-button-text-icon-end" id="nocomp11" disabled={disableControls}>
                                                                        <span class="oj-button-text">Next</span>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-end" />
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button12" chroming="borderless" disabled={disableControls}>
                                                                        <span slot="endIcon" class="oj-ux-ico-arrow-right" />
                                                                        Next
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-borderless-chrome oj-button-text-icon-end" id="nocomp12" disabled={disableControls}>
                                                                        <span class="oj-button-text">Next</span>
                                                                        <span class="oj-ux-ico-arrow-right oj-button-icon oj-end" />
                                                                    </button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Text and Both Icons</th>
                                          <td>
                                                        <oj-button id="button20" chroming="callToAction" disabled={disableControls}>
                                                                        <img slot="startIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img slot="endIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-cta-chrome oj-button-text-icons" id="nocomp20" disabled={disableControls}>
                                                                        <img class="oj-button-icon oj-start" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img class="oj-button-icon oj-end" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button13" chroming="solid" disabled={disableControls}>
                                                                        <img slot="startIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img slot="endIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-solid-chrome oj-button-text-icons" id="nocomp13" disabled={disableControls}>
                                                                        <img class="oj-button-icon oj-start" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img class="oj-button-icon oj-end" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button14" chroming="outlined" disabled={disableControls}>
                                                                        <img slot="startIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img slot="endIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-outlined-chrome oj-button-text-icons" id="nocomp14" disabled={disableControls}>
                                                                        <img class="oj-button-icon oj-start" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img class="oj-button-icon oj-end" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </button>
                                                    </td>
                                          <td>
                                                        <oj-button id="button15" chroming="borderless" disabled={disableControls}>
                                                                        <img slot="startIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img slot="endIcon" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <button class="oj-button-nocomp oj-button-borderless-chrome oj-button-text-icons" id="nocomp15" disabled={disableControls}>
                                                                        <img class="oj-button-icon oj-start" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                        Image Tags
                                                                        <img class="oj-button-icon oj-end" src="../css/samples/cookbook/images/hiResContrast/icon.png" alt="bulleted list image" width="16" height="16" />
                                                                    </button>
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
        </div>
    );
};

export default PushButtonsNocompButton;

