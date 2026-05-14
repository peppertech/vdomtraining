// @ts-nocheck
import { h } from 'preact';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojavatar';
import "css!./demo.css";

export const AvatarOverview = () => {
  const firstName: string = 'Amy';
  const lastName: string = 'Bartlett';
  const initials: string = IntlConverterUtils.getInitials(firstName, lastName) ?? '';

  return (
      <div id="avatar-demo-container" class="demo-avatar">
            <h6>Content</h6>
            <div>
                    <table class="oj-helper-text-align-center" role="presentation">
                              <tbody>
                                          <tr>
                                                        <th>Image</th>
                                                        <th>Icon</th>
                                                        <th>Initials</th>
                                                        <th>Single Placeholder</th>
                                                        <th>Group Placeholder</th>
                                                    </tr>
                                          <tr>
                                                        <td>
                                                                        <oj-avatar role="img" initials={initials} src="/styles/images/composites/avatar-image.jpg" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                                    </td>
                                                        <td>
                                                                        <oj-avatar role="img" iconClass="oj-ux-ico-car" aria-label="Car" title="Car" />
                                                                    </td>
                                                        <td>
                                                                        <oj-avatar role="img" initials={initials} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                                    </td>
                                                        <td>
                                                                        <oj-avatar role="img" aria-label="Single Placeholder" title="Single Placeholder" />
                                                                    </td>
                                                        <td>
                                                                        <oj-avatar role="img" aria-label="Group Placeholder" title="Group Placeholder" iconClass="oj-ux-ico-contact-group" />
                                                                    </td>
                                                    </tr>
                                      </tbody>
                          </table>
                </div>
            <h6>Shapes</h6>
            <table class="oj-helper-text-align-center" role="presentation">
                    <tbody>
                              <tr>
                                          <th>Default (theme-specific)</th>
                                          <th>Square</th>
                                          <th>Circle</th>
                                      </tr>
                              <tr>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} shape="square" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} shape="circle" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
            <h6>Colors</h6>
            <table class="oj-helper-text-align-center" role="presentation">
                    <tbody>
                              <tr>
                                          <th>Default</th>
                                          <th>Orange</th>
                                          <th>Green</th>
                                          <th>Teal</th>
                                          <th>Blue</th>
                                          <th>Slate</th>
                                          <th>Pink</th>
                                          <th>Purple</th>
                                          <th>Lilac</th>
                                          <th>Gray</th>
                                      </tr>
                              <tr>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="orange" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="green" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="teal" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="blue" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="slate" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="pink" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="purple" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="lilac" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} background="gray" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
            <h6>Sizes</h6>
            <table class="oj-helper-text-align-center" role="presentation">
                    <tbody>
                              <tr>
                                          <th>2xs</th>
                                          <th>xs</th>
                                          <th>sm</th>
                                          <th>md (default)</th>
                                          <th>lg</th>
                                          <th>xl</th>
                                          <th>2xl</th>
                                      </tr>
                              <tr>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} size="2xs" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} size="xs" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} size="sm" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} size="lg" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} size="xl" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                          <td>
                                                        <oj-avatar role="img" initials={initials} size="2xl" aria-label={firstName + ' ' + lastName} title={firstName + ' ' + lastName} />
                                                    </td>
                                      </tr>
                          </tbody>
                </table>
        </div>
    );
};

export default AvatarOverview;
