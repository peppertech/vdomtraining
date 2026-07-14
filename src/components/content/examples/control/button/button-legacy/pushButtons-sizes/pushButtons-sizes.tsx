import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

type CheckboxsetValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];
type RadiosetValue = NonNullable<ComponentProps<'oj-radioset'>['value']>;
type RadiosetValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

type ChromingValue = 'outlined' | 'borderless' | 'solid';
type ChromingOption = {
  id: string;
  value: ChromingValue;
  label: string;
};
type ItemInfo = {
  id: string;
  label: string;
  icon: string;
  disabled?: boolean;
};
type SizeConfig = {
  className?: string;
};

const chromingOptions: ChromingOption[] = [
  { id: 'outlinedopt', value: 'outlined', label: 'Outlined' },
  { id: 'borderlessopt', value: 'borderless', label: 'Borderless' },
  { id: 'solidopt', value: 'solid', label: 'Solid' }
];

const menuItems: ItemInfo[] = [
  { id: 'save', label: 'Save', icon: 'oj-ux-ico-print' },
  { id: 'zoomin', label: 'Zoom In', icon: 'oj-ux-ico-zoom-in' },
  { id: 'zoomout', label: 'Zoom Out', icon: 'oj-ux-ico-zoom-out' },
  { id: 'print', label: 'Print...', icon: 'oj-ux-ico-print', disabled: true }
];

const buttonsetButtons: ItemInfo[] = [
  { id: 'left', label: 'Left', icon: 'oj-ux-ico-align-left' },
  { id: 'center', label: 'Center', icon: 'oj-ux-ico-align-center' },
  { id: 'right', label: 'Right', icon: 'oj-ux-ico-align-right' }
];

const sizes: SizeConfig[] = [{ className: 'oj-button-sm' }, {}, { className: 'oj-button-lg' }];

const joinClasses = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

const renderMenuItems = () =>
  menuItems.map((item) => (
    <oj-option value={item.label} disabled={item.disabled} id={item.id}>
      {item.icon ? <span slot="startIcon" class={item.icon} /> : null}
      {item.label}
    </oj-option>
  ));

const renderButtonsetOptions = (showIcons: boolean) =>
  buttonsetButtons.map((item) => (
    <oj-option value={item.id}>
      {showIcons ? <span slot="startIcon" class={item.icon} /> : null}
      <span>{item.label}</span>
    </oj-option>
  ));

export const PushButtonsSizes = () => {
  const [currentChromingValue, setCurrentChromingValue] = useState<RadiosetValue>('outlined');
  const [disabledValue, setDisabledValue] = useState<CheckboxsetValue>([]);

  const currentChromingLabel = useMemo(
    () => chromingOptions.find((item) => item.value === currentChromingValue)?.label ?? 'Outlined',
    [currentChromingValue]
  );

  const disableControls = disabledValue.includes('true');
  const isRedwood = document.body.className.includes('redwood');
  const toggleSupported = !(isRedwood && currentChromingValue === 'solid');
  const chromingButtonLabel = `${currentChromingLabel} Button`;

  const handleChromingChanged = (event: RadiosetValueChangedEvent) => {
    setCurrentChromingValue((event.detail.value ?? 'outlined') as RadiosetValue);
  };

  const handleDisabledChanged = (event: CheckboxsetValueChangedEvent) => {
    setDisabledValue((event.detail.value ?? []) as CheckboxsetValue);
  };

  const renderPushRow = (variant: 'icon' | 'text' | 'textIcon') =>
    sizes.map((size) => (
      <td>
        <oj-button
          chroming={currentChromingValue as ChromingValue}
          class={size.className}
          display={variant === 'icon' ? 'icons' : undefined}
          disabled={disableControls}
        >
          {variant !== 'text' ? <span slot="startIcon" class="oj-ux-ico-share" /> : null}
          <span>{chromingButtonLabel}</span>
        </oj-button>
      </td>
    ));

  const renderToggleManyRow = (variant: 'icon' | 'text' | 'textIcon') =>
    sizes.map((size) => (
      <td>
        {toggleSupported ? (
          <oj-buttonset-many
            chroming={currentChromingValue as ChromingValue}
            class={joinClasses('oj-buttonset-width-auto', size.className)}
            value={['toggle']}
            display={variant === 'icon' ? 'icons' : undefined}
            disabled={disableControls}
          >
            <oj-option value="toggle">
              {variant !== 'text' ? <span slot="startIcon" class="oj-ux-ico-share" /> : null}
              <span>{chromingButtonLabel}</span>
            </oj-option>
          </oj-buttonset-many>
        ) : (
          'N/A'
        )}
      </td>
    ));

  const renderMenuRow = (variant: 'icon' | 'text' | 'textIcon') =>
    sizes.map((size) => (
      <td>
        <oj-menu-button
          chroming={currentChromingValue as ChromingValue}
          class={size.className}
          display={variant === 'icon' ? 'icons' : undefined}
          disabled={disableControls}
        >
          {variant !== 'text' ? <span slot="startIcon" class="oj-ux-ico-share" /> : null}
          <span>{chromingButtonLabel}</span>
          <oj-menu slot="menu" aria-label="menu with options">
            {renderMenuItems()}
          </oj-menu>
        </oj-menu-button>
      </td>
    ));

  const renderButtonsetManyRow = (variant: 'icon' | 'text' | 'textIcon') =>
    sizes.map((size) => (
      <td>
        {toggleSupported ? (
          <oj-buttonset-many
            chroming={currentChromingValue as ChromingValue}
            class={joinClasses('oj-buttonset-width-auto', size.className)}
            value={['left']}
            display={variant === 'icon' ? 'icons' : undefined}
            disabled={disableControls}
          >
            {renderButtonsetOptions(variant !== 'text')}
          </oj-buttonset-many>
        ) : (
          'N/A'
        )}
      </td>
    ));

  const renderButtonsetOneRow = (variant: 'icon' | 'text' | 'textIcon') =>
    sizes.map((size) => (
      <td>
        {toggleSupported ? (
          <oj-buttonset-one
            chroming={currentChromingValue as ChromingValue}
            class={joinClasses('oj-buttonset-width-auto', size.className)}
            value="left"
            display={variant === 'icon' ? 'icons' : undefined}
            disabled={disableControls}
          >
            {renderButtonsetOptions(variant !== 'text')}
          </oj-buttonset-one>
        ) : (
          'N/A'
        )}
      </td>
    ));

  return (
    <div id="button-container">
      <oj-form-layout userAssistanceDensity="reflow">
        <oj-radioset
          class="oj-choice-direction-row"
          value={currentChromingValue}
          labelHint="Chroming"
          onvalueChanged={handleChromingChanged}
        >
          {chromingOptions.map((item) => (
            <oj-option id={item.id} value={item.value}>
              {item.label}
            </oj-option>
          ))}
        </oj-radioset>
        <oj-checkboxset id="disabledValue" value={disabledValue} onvalueChanged={handleDisabledChanged}>
          <oj-option value="true">Disable examples</oj-option>
        </oj-checkboxset>
      </oj-form-layout>

      <table class="demo-recipe-table demo-recipe-spacing" aria-label="alternate size buttons">
        <tbody>
          <tr>
            <td />
            <th scope="col">
              <code class="demo-selectornames">oj-button-sm</code>
            </th>
            <th scope="col">Default</th>
            <th scope="col">
              <code class="demo-selectornames">oj-button-lg</code>
            </th>
          </tr>

          <tr>
            <th scope="row">Push button: Icon only</th>
            {renderPushRow('icon')}
          </tr>
          <tr>
            <th scope="row">Push button: Text</th>
            {renderPushRow('text')}
          </tr>
          <tr>
            <th scope="row">Push button: Text and Icon</th>
            {renderPushRow('textIcon')}
          </tr>

          <tr>
            <th scope="row">
              Toggle button: Icon only
              <div class="oj-typography-body-sm">initially toggled on</div>
            </th>
            {renderToggleManyRow('icon')}
          </tr>
          <tr>
            <th scope="row">
              Toggle button: Text
              <div class="oj-typography-body-sm">initially toggled on</div>
            </th>
            {renderToggleManyRow('text')}
          </tr>
          <tr>
            <th scope="row">
              Toggle button: Text and Icon
              <div class="oj-typography-body-sm">initially toggled on</div>
            </th>
            {renderToggleManyRow('textIcon')}
          </tr>

          <tr>
            <th scope="row">Menu button: Icon only</th>
            {renderMenuRow('icon')}
          </tr>
          <tr>
            <th scope="row">Menu button: Text</th>
            {renderMenuRow('text')}
          </tr>
          <tr>
            <th scope="row">Menu button: Text and Icon</th>
            {renderMenuRow('textIcon')}
          </tr>

          <tr>
            <th scope="row">Buttonset Many: Icon only</th>
            {renderButtonsetManyRow('icon')}
          </tr>
          <tr>
            <th scope="row">Buttonset Many: Text</th>
            {renderButtonsetManyRow('text')}
          </tr>
          <tr>
            <th scope="row">Buttonset Many: Text and Icon</th>
            {renderButtonsetManyRow('textIcon')}
          </tr>

          <tr>
            <th scope="row">Buttonset One: Icon only</th>
            {renderButtonsetOneRow('icon')}
          </tr>
          <tr>
            <th scope="row">Buttonset One: Text</th>
            {renderButtonsetOneRow('text')}
          </tr>
          <tr>
            <th scope="row">Buttonset One: Text and Icon</th>
            {renderButtonsetOneRow('textIcon')}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PushButtonsSizes;
