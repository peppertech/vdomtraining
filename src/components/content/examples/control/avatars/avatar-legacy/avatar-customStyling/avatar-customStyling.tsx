// @ts-nocheck
import { JetElementCustomEvent } from 'ojs/index';
import { h } from 'preact';
import type { ComponentProps } from 'preact';type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
type AvatarShape = ComponentProps<'oj-avatar'>['shape'];
import { useState } from 'preact/hooks';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojavatar';
import 'ojs/ojradioset';
import 'ojs/ojoption';
import "css!./demo.css";
export const AvatarCustomStyling = () => {
  const [shape, setShape] = useState<string>('theme');
  const shapeValue: AvatarShape = shape === 'theme' ? undefined : (shape as Exclude<AvatarShape, undefined>);
  const firstName: string = 'Amy';
  const lastName: string = 'Bartlett';
  const initials: string = IntlConverterUtils.getInitials(firstName, lastName) ?? '';
  const handleShapeValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0]) => {
    setShape(event.detail.value);
  };
  return (
      <div id="demo-container">
            <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
                    <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Avatars Below</h2>
                    <oj-radioset onvalueChanged={handleShapeValueChanged} value={shape} class="oj-choice-direction-row" labelHint="Shape" labelEdge="inside" aria-controls="avatar1">
                              <oj-option value="theme">Default (theme-specific)</oj-option>
                              <oj-option value="square">square</oj-option>
                              <oj-option value="circle">circle</oj-option>
                          </oj-radioset>
                </div>
            <table id="avatar1" class="oj-helper-text-align-center oj-sm-width-full" role="presentation">
                    <tbody>
                              <tr>
                                          <th>Default</th>
                                          <th>Custom (Red)</th>
                                          <th>Custom (Large)</th>
                                      </tr>
                              <tr>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" class="demo-avatar-red" initials={initials} aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" class="demo-avatar-larger" initials={initials} aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
        </div>
    );
};
export default AvatarCustomStyling;
