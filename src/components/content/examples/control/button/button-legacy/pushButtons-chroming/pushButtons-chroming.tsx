// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojcheckboxset';
import 'ojs/ojoption';
import 'ojs/ojmenubutton';
type ItemInfo = {
    id: string;
    label?: string;
    icon: string;
    disabled?: boolean;
};
type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;
export const PushButtonsChroming = () => {
    const [disabledValue, setDisabledValue] = useState<string[]>([]);
    const disableControls = disabledValue.includes('true');
    const someButtons = useMemo(() => [
        { id: 'Left', icon: 'oj-ux-ico-align-left' },
        { id: 'Center', icon: 'oj-ux-ico-align-center' },
        { id: 'Right', icon: 'oj-ux-ico-align-right' }
    ], []);
    const menuItems = useMemo(() => [
        { id: 'save', label: 'Save', icon: 'oj-ux-ico-print', disabled: false },
        {
            id: 'zoomin',
            label: 'Zoom In',
            icon: 'oj-ux-ico-zoom-in',
            disabled: false
        },
        {
            id: 'zoomout',
            label: 'Zoom Out',
            icon: 'oj-ux-ico-zoom-out',
            disabled: false
        },
        {
            id: 'print',
            label: 'Print...',
            icon: 'oj-ux-ico-print',
            disabled: true
        }
    ], []);
    const handleDisabledValueValueChanged = (event: PropertyChangedEvent<string[]>) => {
        setDisabledValue(event.detail.value);
    };
    return (<div id="button-container">
            <oj-checkboxset id="disabledControls" onvalueChanged={handleDisabledValueValueChanged} value={disabledValue}><oj-option value="true">Disable examples</oj-option></oj-checkboxset>
            <h3 class="oj-sm-margin-4x-top">Borderless Chroming</h3>
            <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label="borderless buttons">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">Text Only</th>
                                          <th scope="col">Text & Icon</th>
                                          <th scope="col">Icon only</th>
                                      </tr>
                              <tr>
                                          <th scope="row">Push button</th>
                                          <td>
                                                        <oj-button chroming="borderless" id="borderlessPushText" disabled={disableControls}>Borderless Button</oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="borderless" id="borderlessPushTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Borderless Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="borderless" id="borderlessPushIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Borderless Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Menu button</th>
                                          <td>
                                                        <oj-menu-button chroming="borderless" id="borderlessMenuText" disabled={disableControls}>
                                                                        Borderless Button
                                                                        <oj-menu id="myMenu7" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                          <td>
                                                        <oj-menu-button chroming="borderless" id="borderlessMenuTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Borderless Button
                                                                        <oj-menu id="myMenu8" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                          <td>
                                                        <oj-menu-button chroming="borderless" id="borderlessMenuWithStartIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Borderless Button
                                                                        <oj-menu id="myMenu9" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                        <oj-menu-button chroming="borderless" id="borderlessMenuWithoutStartIcon" display="icons" disabled={disableControls}>
                                                                        Borderless Button
                                                                        <oj-menu id="myMenu9_noStart" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button On</th>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" id="borderlessToggleText" value={['toggle']} disabled={disableControls}><oj-option value="toggle">Borderless button</oj-option></oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" id="borderlessToggleTextIcon" value={['toggle']} disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Borderless button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" id="borderlessToggleIcon" value={['toggle']} display="icons" disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Borderless button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button Off</th>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" value={[]} disabled={disableControls}><oj-option value="toggle">Borderless button</oj-option></oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" value={[]} disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Borderless button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" value={[]} display="icons" disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Borderless button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset One</th>
                                          <td>
                                                        <oj-buttonset-one chroming="borderless" class="oj-buttonset-width-auto" value={'Left'} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}><span>{item.id}</span></oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-one>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-one chroming="borderless" class="oj-buttonset-width-auto" value={'Left'} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-one>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-one chroming="borderless" class="oj-buttonset-width-auto" value={'Left'} disabled={disableControls} display="icons">
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-one>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset Many</th>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" class="oj-buttonset-width-auto" id="borderlessSetManyText" value={['Left', 'Center']} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}><span>{item.id}</span></oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" class="oj-buttonset-width-auto" id="borderlessSetManyTextIcon" value={['Left', 'Center']} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="borderless" class="oj-buttonset-width-auto" id="borderlessSetManyIcon" value={['Left', 'Center']} disabled={disableControls} display="icons">
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-many>
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
            <h3 class="oj-sm-margin-8x-top">Outlined Chroming</h3>
            <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label="outlined buttons">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">Text Only</th>
                                          <th scope="col">Text & Icon</th>
                                          <th scope="col">Icon only</th>
                                      </tr>
                              <tr>
                                          <th scope="row">Push button</th>
                                          <td>
                                                        <oj-button chroming="outlined" id="outlinedPushText" disabled={disableControls}>Outlined Button</oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="outlined" id="outlinedPushTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Outlined Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="outlined" id="outlinedPushIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Outlined Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Menu button</th>
                                          <td>
                                                        <oj-menu-button chroming="outlined" id="outlinedMenuText" disabled={disableControls}>
                                                                        Outlined Button
                                                                        <oj-menu id="myMenu4" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                          <td>
                                                        <oj-menu-button chroming="outlined" id="outlinedMenuTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Outlined Button
                                                                        <oj-menu id="myMenu5" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                          <td>
                                                        <oj-menu-button chroming="outlined" id="outlinedMenuWithStartIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Outlined Button
                                                                        <oj-menu id="myMenu6" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                        <oj-menu-button chroming="outlined" id="outlinedMenuWithoutStartIcon" display="icons" disabled={disableControls}>
                                                                        Outlined Button
                                                                        <oj-menu id="myMenu6_noStart" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button On</th>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" id="outlinedToggleText" value={['toggle']} disabled={disableControls}><oj-option value="toggle">Outlined button</oj-option></oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" id="outlinedToggleTextIcon" value={['toggle']} disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Outlined button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" id="outlinedToggleIcon" value={['toggle']} display="icons" disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Outlined button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button Off</th>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" value={[]} disabled={disableControls}><oj-option value="toggle">Outlined button</oj-option></oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" value={[]} disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Outlined button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" value={[]} display="icons" disabled={disableControls}>
                                                                        <oj-option value="toggle">
                                                                                          <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                                          Outlined button
                                                                                      </oj-option>
                                                                    </oj-buttonset-many>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset One</th>
                                          <td>
                                                        <oj-buttonset-one chroming="outlined" class="oj-buttonset-width-auto" value={'Left'} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}><span>{item.id}</span></oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-one>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-one chroming="outlined" class="oj-buttonset-width-auto" value={'Left'} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-one>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-one chroming="outlined" class="oj-buttonset-width-auto" value={'Left'} disabled={disableControls} display="icons">
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-one>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset Many</th>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" class="oj-buttonset-width-auto" id="outlinedSetManyText" value={['Left', 'Center']} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}><span>{item.id}</span></oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" class="oj-buttonset-width-auto" id="outlinedSetManyTextIcon" value={['Left', 'Center']} disabled={disableControls}>
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-many>
                                                    </td>
                                          <td>
                                                        <oj-buttonset-many chroming="outlined" class="oj-buttonset-width-auto" id="outlinedSetManyIcon" value={['Left', 'Center']} disabled={disableControls} display="icons">
                                                                        {(someButtons ?? []).map((item) => (<>
                                                                                            <oj-option value={item.id}>
                                                                                                                  <span slot="startIcon" class={item.icon}/>
                                                                                                                  <span>{item.id}</span>
                                                                                                              </oj-option>
                                                                                          </>))}
                                                                    </oj-buttonset-many>
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
            <h3 class="oj-sm-margin-8x-top">Solid Chroming</h3>
            <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label="solid buttons">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">Text Only</th>
                                          <th scope="col">Text & Icon</th>
                                          <th scope="col">Icon only</th>
                                      </tr>
                              <tr>
                                          <th scope="row">Push button</th>
                                          <td>
                                                        <oj-button chroming="solid" id="solidPushText" disabled={disableControls}>Solid Button</oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="solid" id="solidPushTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Solid Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="solid" id="solidPushIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Solid Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Menu button</th>
                                          <td>
                                                        <oj-menu-button chroming="solid" id="solidMenuText" disabled={disableControls}>
                                                                        Solid Button
                                                                        <oj-menu id="myMenu" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                          <td>
                                                        <oj-menu-button chroming="solid" id="solidMenuTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Solid Button
                                                                        <oj-menu id="myMenu3" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                          <td class="oj-helper-white-space-nowrap">
                                                        <oj-menu-button chroming="solid" id="solidMenuWithStartIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Solid Button
                                                                        <oj-menu id="myMenu2" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                        <oj-menu-button chroming="solid" id="solidMenuWithoutStartIcon" display="icons" disabled={disableControls}>
                                                                        Solid Button
                                                                        <oj-menu id="myMenu2_noStart" slot="menu" aria-label="menu with options">
                                                                                          {(menuItems ?? []).map((item) => (<>
                                                                                                                <oj-option value={item.label} disabled={item.disabled} id={item.id}>
                                                                                                                                        {item.icon ? (<>
                                                                                                                                                                    <span slot="startIcon" class={item.icon}/>
                                                                                                                                                                  </>) : undefined}
                                                                                                                                        {item.label}
                                                                                                                                    </oj-option>
                                                                                                              </>))}
                                                                                      </oj-menu>
                                                                    </oj-menu-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button On</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button Off</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset One</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset Many</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                          </tbody>
                </table>
            <h3 class="oj-sm-margin-8x-top">Call To Action Chroming</h3>
            <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label="call to action buttons">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">Text Only</th>
                                          <th scope="col">Text & Icon</th>
                                          <th scope="col">Icon only</th>
                                      </tr>
                              <tr>
                                          <th scope="row">Push button</th>
                                          <td>
                                                        <oj-button chroming="callToAction" id="ctaPushText" disabled={disableControls}>Call To Action Button</oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="callToAction" id="ctaPushTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Call To Action Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="callToAction" id="ctaPushIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Call To Action Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Menu button</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset One</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset Many</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                          </tbody>
                </table>
            <h3 class="oj-sm-margin-8x-top">Danger Chroming</h3>
            <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label="Danger buttons">
                    <tbody>
                              <tr>
                                          <td />
                                          <th scope="col">Text Only</th>
                                          <th scope="col">Text & Icon</th>
                                          <th scope="col">Icon only</th>
                                      </tr>
                              <tr>
                                          <th scope="row">Push button</th>
                                          <td>
                                                        <oj-button chroming="danger" id="dangerPushText" disabled={disableControls}>Danger Button</oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="danger" id="damgerPushTextIcon" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Danger Button
                                                                    </oj-button>
                                                    </td>
                                          <td>
                                                        <oj-button chroming="danger" id="dangerPushIcon" display="icons" disabled={disableControls}>
                                                                        <span slot="startIcon" class="oj-ux-ico-share"/>
                                                                        Danger Button
                                                                    </oj-button>
                                                    </td>
                                      </tr>
                              <tr>
                                          <th scope="row">Menu button</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Toggle button</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset One</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                              <tr>
                                          <th scope="row">Buttonset Many</th>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                          <td>N/A</td>
                                      </tr>
                          </tbody>
                </table>
        </div>);
};
export default PushButtonsChroming;
