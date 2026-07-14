import 'oj-c/button';
import 'oj-c/buttonset-multiple';
import 'oj-c/buttonset-single';
import 'oj-c/menu-button';
import 'oj-c/progress-button';
import 'oj-c/radioset';
import 'oj-c/split-menu-button';
import 'oj-c/toggle-button';
import 'preact';
import type { ComponentChildren,ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type ControlState = 'enabled' | 'disabled';
type PushChroming = NonNullable<ComponentProps<'oj-c-button'>['chroming']>;
type ProgressChroming = NonNullable<ComponentProps<'oj-c-progress-button'>['chroming']>;
type MenuChroming = NonNullable<ComponentProps<'oj-c-menu-button'>['chroming']>;
type SplitMenuChroming = NonNullable<ComponentProps<'oj-c-split-menu-button'>['chroming']>;
type ToggleChroming = NonNullable<ComponentProps<'oj-c-toggle-button'>['chroming']>;
type ButtonsetSingleChroming = NonNullable<ComponentProps<'oj-c-buttonset-single'>['chroming']>;
type ButtonsetMultipleChroming = NonNullable<ComponentProps<'oj-c-buttonset-multiple'>['chroming']>;
type MenuItems = NonNullable<ComponentProps<'oj-c-split-menu-button'>['items']>;
type ButtonsetSingleItems = NonNullable<ComponentProps<'oj-c-buttonset-single'>['items']>;
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-radioset'>['onvalueChanged']>
>[0];

const controlStateItems: Array<{ value: ControlState; label: string }> = [
  { value: 'enabled', label: 'Enabled' },
  { value: 'disabled', label: 'Disabled' }
];

const menuItems: MenuItems = [
  { key: 'save', label: 'Save', startIcon: { class: 'oj-ux-ico-print' } },
  { key: 'zoomin', label: 'Zoom In', startIcon: { class: 'oj-ux-ico-zoom-in' } },
  { key: 'zoomout', label: 'Zoom Out', startIcon: { class: 'oj-ux-ico-zoom-out' } },
  { key: 'print', label: 'Print...', startIcon: { class: 'oj-ux-ico-print' }, disabled: true }
];

const buttonsetItems: ButtonsetSingleItems = [
  { value: 'left', label: 'Left', startIcon: { class: 'oj-ux-ico-align-left' } },
  { value: 'center', label: 'Center', startIcon: { class: 'oj-ux-ico-align-center' } },
  { value: 'right', label: 'Right', startIcon: { class: 'oj-ux-ico-align-right' } }
];

const multipleValue = ['left', 'center'];

const TableCell = ({ children }: { children: ComponentChildren }) => <td>{children}</td>;

const HeaderRow = () => (
  <tr>
    <td />
    <th scope="col">Text Only</th>
    <th scope="col">Text &amp; Icon</th>
    <th scope="col">Icon only</th>
  </tr>
);

const renderNotAvailableCells = (section: string) => [
  <TableCell key={`${section}-text`}>N/A</TableCell>,
  <TableCell key={`${section}-text-icon`}>N/A</TableCell>,
  <TableCell key={`${section}-icon`}>N/A</TableCell>
];

const renderPushCells = (chroming: PushChroming, label: string, disabled: boolean) => [
  <TableCell key={`${chroming}-push-text`}>
    <oj-c-button chroming={chroming} id={`${chroming}PushText`} disabled={disabled} label={label} />
  </TableCell>,
  <TableCell key={`${chroming}-push-text-icon`}>
    <oj-c-button
      chroming={chroming}
      id={`${chroming}PushTextIcon`}
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-button>
  </TableCell>,
  <TableCell key={`${chroming}-push-icon`}>
    <oj-c-button
      chroming={chroming}
      id={`${chroming}PushIcon`}
      display="icons"
      label={label}
      disabled={disabled}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-button>
  </TableCell>
];

const renderProgressCells = (chroming: ProgressChroming, label: string, disabled: boolean) => [
  <TableCell key={`${chroming}-progress-text`}>
    <oj-c-progress-button
      chroming={chroming}
      id={`${chroming}ProgressText`}
      isLoading
      disabled={disabled}
      label={label}
    />
  </TableCell>,
  <TableCell key={`${chroming}-progress-text-icon`}>
    <oj-c-progress-button
      chroming={chroming}
      id={`${chroming}ProgressTextIcon`}
      isLoading
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-progress-button>
  </TableCell>,
  <TableCell key={`${chroming}-progress-icon`}>
    <oj-c-progress-button
      chroming={chroming}
      id={`${chroming}ProgressIcon`}
      isLoading
      display="icons"
      label={label}
      disabled={disabled}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-progress-button>
  </TableCell>
];

const renderMenuCells = (chroming: MenuChroming, label: string, disabled: boolean) => [
  <TableCell key={`${chroming}-menu-text`}>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuText`}
      items={menuItems}
      disabled={disabled}
      label={label}
    />
  </TableCell>,
  <TableCell key={`${chroming}-menu-text-icon`}>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuTextIcon`}
      items={menuItems}
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-menu-button>
  </TableCell>,
  <TableCell key={`${chroming}-menu-icon`}>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuWithStartIcon`}
      display="icons"
      items={menuItems}
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-menu-button>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuWithoutStartIcon`}
      display="icons"
      items={menuItems}
      disabled={disabled}
      label={label}
    />
  </TableCell>
];

const renderSplitMenuCells = (
  chroming: SplitMenuChroming,
  label: string,
  disabled: boolean
) => [
  <TableCell key={`${chroming}-split-text`}>
    <oj-c-split-menu-button
      chroming={chroming}
      id={`${chroming}SplitMenuText`}
      items={menuItems}
      disabled={disabled}
      label={label}
    />
  </TableCell>,
  <TableCell key={`${chroming}-split-text-icon`}>N/A</TableCell>,
  <TableCell key={`${chroming}-split-icon`}>N/A</TableCell>
];

const renderToggleCells = (
  chroming: ToggleChroming,
  label: string,
  disabled: boolean,
  value: boolean
) => [
  <TableCell key={`${chroming}-toggle-text-${String(value)}`}>
    <oj-c-toggle-button chroming={chroming} label={label} value={value} disabled={disabled} />
  </TableCell>,
  <TableCell key={`${chroming}-toggle-text-icon-${String(value)}`}>
    <oj-c-toggle-button chroming={chroming} label={label} value={value} disabled={disabled}>
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-toggle-button>
  </TableCell>,
  <TableCell key={`${chroming}-toggle-icon-${String(value)}`}>
    <oj-c-toggle-button
      chroming={chroming}
      label={label}
      value={value}
      display="icons"
      disabled={disabled}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-toggle-button>
  </TableCell>
];

const renderButtonsetSingleCells = (chroming: ButtonsetSingleChroming, disabled: boolean) => [
  <TableCell key={`${chroming}-single-text`}>
    <oj-c-buttonset-single
      chroming={chroming}
      items={buttonsetItems}
      display="label"
      layoutWidth="auto"
      value="left"
      disabled={disabled}
      aria-label="Choose only one format."
    />
  </TableCell>,
  <TableCell key={`${chroming}-single-all`}>
    <oj-c-buttonset-single
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value="left"
      disabled={disabled}
      aria-label="Choose only one format."
    />
  </TableCell>,
  <TableCell key={`${chroming}-single-icons`}>
    <oj-c-buttonset-single
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value="left"
      display="icons"
      disabled={disabled}
      aria-label="Choose only one format."
    />
  </TableCell>
];

const renderButtonsetMultipleCells = (
  chroming: ButtonsetMultipleChroming,
  disabled: boolean
) => [
  <TableCell key={`${chroming}-multiple-text`}>
    <oj-c-buttonset-multiple
      chroming={chroming}
      items={buttonsetItems}
      display="label"
      layoutWidth="auto"
      value={multipleValue}
      disabled={disabled}
      aria-label="Choose one or more format options."
    />
  </TableCell>,
  <TableCell key={`${chroming}-multiple-all`}>
    <oj-c-buttonset-multiple
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value={multipleValue}
      disabled={disabled}
      aria-label="Choose one or more format options."
    />
  </TableCell>,
  <TableCell key={`${chroming}-multiple-icons`}>
    <oj-c-buttonset-multiple
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value={multipleValue}
      display="icons"
      disabled={disabled}
      aria-label="Choose one or more format options."
    />
  </TableCell>
];

const ChromingSection = ({
  title,
  tableLabel,
  titleClass,
  children
}: {
  title: string;
  tableLabel: string;
  titleClass: string;
  children: ComponentChildren;
}) => (
  <section>
    <h3 class={titleClass}>{title}</h3>
    <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label={tableLabel}>
      <tbody>
        <HeaderRow />
        {children}
      </tbody>
    </table>
  </section>
);

export const MenuButtonsChromingcorepack = () => {
  const [controlState, setControlState] = useState<ControlState>('enabled');

  const handleStateChanged = (event: RadiosetValueChangedEvent) => {
    setControlState((event.detail.value as ControlState | null) ?? 'enabled');
  };

  const disabled = controlState === 'disabled';

  return (
    <div id="menuButtonChroming">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          labelHint="State"
          direction="row"
          value={controlState}
          aria-controls="menuButtonChromingExamples"
          options={controlStateItems}
          onvalueChanged={handleStateChanged}
        />
      </div>

      <div id="menuButtonChromingExamples">
        <ChromingSection
          title="Ghost Chroming"
          titleClass="oj-sm-margin-4x-top"
          tableLabel="ghost buttons"
        >
          <tr>
            <th scope="row">Push button</th>
            {renderPushCells('ghost', 'Ghost Button', disabled)}
          </tr>
        </ChromingSection>

        <ChromingSection
          title="Borderless Chroming"
          titleClass="oj-sm-margin-8x-top"
          tableLabel="borderless menu buttons"
        >
          <tr>
            <th scope="row">Push button</th>
            {renderPushCells('borderless', 'Borderless Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Progress button</th>
            {renderProgressCells('borderless', 'Borderless Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Menu button</th>
            {renderMenuCells('borderless', 'Borderless Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Toggle button On</th>
            {renderToggleCells('borderless', 'Borderless Button', disabled, true)}
          </tr>
          <tr>
            <th scope="row">Toggle button Off</th>
            {renderToggleCells('borderless', 'Borderless Button', disabled, false)}
          </tr>
          <tr>
            <th scope="row">Buttonset One</th>
            {renderButtonsetSingleCells('borderless', disabled)}
          </tr>
          <tr>
            <th scope="row">Buttonset Many</th>
            {renderButtonsetMultipleCells('borderless', disabled)}
          </tr>
        </ChromingSection>

        <ChromingSection
          title="Outlined Chroming"
          titleClass="oj-sm-margin-8x-top"
          tableLabel="outlined menu buttons"
        >
          <tr>
            <th scope="row">Push button</th>
            {renderPushCells('outlined', 'Outlined Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Progress button</th>
            {renderProgressCells('outlined', 'Outlined Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Menu button</th>
            {renderMenuCells('outlined', 'Outlined Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Toggle button On</th>
            {renderToggleCells('outlined', 'Outlined Button', disabled, true)}
          </tr>
          <tr>
            <th scope="row">Toggle button Off</th>
            {renderToggleCells('outlined', 'Outlined Button', disabled, false)}
          </tr>
          <tr>
            <th scope="row">Buttonset One</th>
            {renderButtonsetSingleCells('outlined', disabled)}
          </tr>
          <tr>
            <th scope="row">Buttonset Many</th>
            {renderButtonsetMultipleCells('outlined', disabled)}
          </tr>
          <tr>
            <th scope="row">Split Menu button</th>
            {renderSplitMenuCells('outlined', 'Outlined Button', disabled)}
          </tr>
        </ChromingSection>

        <ChromingSection
          title="Solid Chroming"
          titleClass="oj-sm-margin-8x-top"
          tableLabel="solid menu buttons"
        >
          <tr>
            <th scope="row">Push button</th>
            {renderPushCells('solid', 'Solid Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Progress button</th>
            {renderProgressCells('solid', 'Solid Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Menu button</th>
            {renderMenuCells('solid', 'Solid Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Split Menu button</th>
            {renderSplitMenuCells('solid', 'Solid Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Toggle button On</th>
            {renderNotAvailableCells('solid-toggle-on')}
          </tr>
          <tr>
            <th scope="row">Toggle button Off</th>
            {renderNotAvailableCells('solid-toggle-off')}
          </tr>
          <tr>
            <th scope="row">Buttonset One</th>
            {renderNotAvailableCells('solid-buttonset-one')}
          </tr>
          <tr>
            <th scope="row">Buttonset Many</th>
            {renderNotAvailableCells('solid-buttonset-many')}
          </tr>
        </ChromingSection>

        <ChromingSection
          title="Call To Action Chroming"
          titleClass="oj-sm-margin-8x-top"
          tableLabel="call to action menu buttons"
        >
          <tr>
            <th scope="row">Push button</th>
            {renderPushCells('callToAction', 'Call To Action Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Progress button</th>
            {renderProgressCells('callToAction', 'Call To Action Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Split Menu button</th>
            {renderSplitMenuCells('callToAction', 'Call To Action Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Menu button</th>
            {renderNotAvailableCells('call-to-action-menu')}
          </tr>
          <tr>
            <th scope="row">Toggle button</th>
            {renderNotAvailableCells('call-to-action-toggle')}
          </tr>
          <tr>
            <th scope="row">Buttonset One</th>
            {renderNotAvailableCells('call-to-action-buttonset-one')}
          </tr>
          <tr>
            <th scope="row">Buttonset Many</th>
            {renderNotAvailableCells('call-to-action-buttonset-many')}
          </tr>
        </ChromingSection>

        <ChromingSection
          title="Danger Chroming"
          titleClass="oj-sm-margin-8x-top"
          tableLabel="danger menu buttons"
        >
          <tr>
            <th scope="row">Push button</th>
            {renderPushCells('danger', 'Danger Button', disabled)}
          </tr>
          <tr>
            <th scope="row">Menu button</th>
            {renderNotAvailableCells('danger-menu')}
          </tr>
          <tr>
            <th scope="row">Toggle button</th>
            {renderNotAvailableCells('danger-toggle')}
          </tr>
          <tr>
            <th scope="row">Buttonset One</th>
            {renderNotAvailableCells('danger-buttonset-one')}
          </tr>
          <tr>
            <th scope="row">Buttonset Many</th>
            {renderNotAvailableCells('danger-buttonset-many')}
          </tr>
        </ChromingSection>
      </div>
    </div>
  );
};

export default MenuButtonsChromingcorepack;
