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
export const AvatarCombinations = () => {
    const [shape, setShape] = useState<string>('theme');
    const firstName: string = 'Amy';
    const lastName: string = 'Bartlett';
    const initials: string = IntlConverterUtils.getInitials(firstName, lastName) ?? '';
    const shapeValue: AvatarShape = shape === 'theme' ? undefined : (shape as AvatarShape);
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
                        <th>Type/Color</th>
                        <th>2XS</th>
                        <th>XS</th>
                        <th>SM</th>
                        <th>MD</th>
                        <th>LG</th>
                        <th>XL</th>
                        <th>2XL</th>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} shape={shapeValue} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Icon</td>
                        <td>
                            <oj-avatar role="img" size="2xs" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                        <td>
                            <oj-avatar role="img" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" iconClass="oj-ux-ico-car" shape={shapeValue} aria-label="Car" title="Car" />
                        </td>
                    </tr>
                    <tr>
                        <td>Neutral (default)</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="orange" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Green</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="green" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Teal</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="teal" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Blue</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="blue" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Slate</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="slate" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Pink</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="pink" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Purple</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="purple" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Lilac</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="lilac" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Gray</td>
                        <td>
                            <oj-avatar role="img" size="2xs" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xs" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="sm" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="lg" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="xl" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                        <td>
                            <oj-avatar role="img" size="2xl" initials={initials} background="gray" shape={shapeValue} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Single Placeholder</td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} size="2xs" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} size="xs" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} size="sm" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} size="lg" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} size="xl" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" shape={shapeValue} size="2xl" />
                        </td>
                    </tr>
                    <tr>
                        <td>Group Placeholder</td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} size="2xs" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} size="xs" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} size="sm" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} size="lg" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} size="xl" />
                        </td>
                        <td>
                            <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" shape={shapeValue} size="2xl" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default AvatarCombinations;
