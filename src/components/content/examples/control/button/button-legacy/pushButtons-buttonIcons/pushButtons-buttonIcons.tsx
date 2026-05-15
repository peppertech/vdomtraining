import { h, type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojbutton';

type ButtonsetValue = NonNullable<ComponentProps<'oj-buttonset-many'>['value']>;
type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>
>[0];

const iconClass = (selected: ButtonsetValue) =>
  selected.length > 0 ? 'oj-ux-ico-share' : 'oj-ux-ico-copy';

export const PushButtonsButtonIcons = () => {
  const [isSelectedIconOnly, setIsSelectedIconOnly] =
    useState<ButtonsetValue>(['selectedIconOnly']);
  const [isSelectedTextAndStartIcon, setIsSelectedTextAndStartIcon] = useState<ButtonsetValue>([
    'selectedTextAndStartIcon'
  ]);
  const [isSelectedTextAndEndIcon, setIsSelectedTextAndEndIcon] = useState<ButtonsetValue>([
    'selectedTextAndEndIcon'
  ]);

  const handleIconOnlyChanged = (event: ButtonsetValueChangedEvent) => {
    setIsSelectedIconOnly((event.detail.value ?? []) as ButtonsetValue);
  };

  const handleTextAndStartIconChanged = (event: ButtonsetValueChangedEvent) => {
    setIsSelectedTextAndStartIcon((event.detail.value ?? []) as ButtonsetValue);
  };

  const handleTextAndEndIconChanged = (event: ButtonsetValueChangedEvent) => {
    setIsSelectedTextAndEndIcon((event.detail.value ?? []) as ButtonsetValue);
  };

  return (
    <div id="buttons-container">
      <div id="buttons-icons-example">
        <table class="demo-recipe-table demo-recipe-spacing" aria-label="Icon Buttons">
          <thead>
            <tr>
              <th scope="col">Button Type</th>
              <th scope="col">Push buttons</th>
              <th scope="col">Toggle buttons</th>
              <th scope="col">Toggle buttons with content changing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Icon Only</th>
              <td>
                <oj-button display="icons">
                  <span slot="startIcon" class="oj-ux-ico-share" />
                  Share
                </oj-button>
              </td>
              <td>
                <oj-buttonset-many value={['myValue']} display="icons">
                  <oj-option value="myValue">
                    <span slot="startIcon" class="oj-ux-ico-share" />
                    Share
                  </oj-option>
                </oj-buttonset-many>
              </td>
              <td>
                <oj-buttonset-many
                  value={isSelectedIconOnly}
                  display="icons"
                  onvalueChanged={handleIconOnlyChanged}
                >
                  <oj-option value="selectedIconOnly">
                    <span slot="startIcon" class={iconClass(isSelectedIconOnly)} />
                  </oj-option>
                </oj-buttonset-many>
              </td>
            </tr>
            <tr>
              <th scope="row">Text and Start Icon</th>
              <td>
                <oj-button>
                  <span slot="startIcon" class="oj-ux-ico-avatar" />
                  Start Slot
                </oj-button>
              </td>
              <td>
                <oj-buttonset-many value={['myValue']}>
                  <oj-option value="myValue">
                    <span slot="startIcon" class="oj-ux-ico-avatar" />
                    Start Slot
                  </oj-option>
                </oj-buttonset-many>
              </td>
              <td>
                <oj-buttonset-many
                  value={isSelectedTextAndStartIcon}
                  onvalueChanged={handleTextAndStartIconChanged}
                >
                  <oj-option value="selectedTextAndStartIcon">
                    <span slot="startIcon" class={iconClass(isSelectedTextAndStartIcon)} />
                    Start Slot
                  </oj-option>
                </oj-buttonset-many>
              </td>
            </tr>
            <tr>
              <th scope="row">Text and End Icon</th>
              <td>
                <oj-button>
                  <span slot="endIcon" class="oj-ux-ico-avatar" />
                  End Slot
                </oj-button>
              </td>
              <td>
                <oj-buttonset-many value={['myValue']}>
                  <oj-option value="myValue">
                    <span slot="endIcon" class="oj-ux-ico-avatar" />
                    End Slot
                  </oj-option>
                </oj-buttonset-many>
              </td>
              <td>
                <oj-buttonset-many
                  value={isSelectedTextAndEndIcon}
                  onvalueChanged={handleTextAndEndIconChanged}
                >
                  <oj-option value="selectedTextAndEndIcon">
                    <span slot="endIcon" class={iconClass(isSelectedTextAndEndIcon)} />
                    End Slot
                  </oj-option>
                </oj-buttonset-many>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PushButtonsButtonIcons;
