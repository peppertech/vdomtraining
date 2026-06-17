import { h, type ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'css!./demo.css';

type ResponsiveItem = {
  id: string;
  icon: string;
};
type DrinkOption = {
  id: string;
  value: string;
  drink: string;
};
type ButtonsetManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>
>[0];

const responsiveItems: ResponsiveItem[] = [
  { id: 'Home', icon: 'oj-ux-ico-home' },
  { id: 'Guide', icon: 'oj-ux-ico-education' },
  { id: 'Library', icon: 'oj-ux-ico-library' },
  { id: 'Styles', icon: 'oj-ux-ico-color-palette' },
  { id: 'FAQ', icon: 'oj-ux-ico-chat' }
];
const drinkOptions: DrinkOption[] = [
  { id: 'coffeeopt', value: 'coffee', drink: 'Coffee' },
  { id: 'teaopt', value: 'tea', drink: 'Tea' },
  { id: 'milkopt', value: 'milk', drink: 'Milk' }
];

export const ToggleButtonsManyOverview = () => {
  const [isAdvanced, setIsAdvanced] = useState<string[]>([]);
  const [screenRange, setScreenRange] = useState('lg');
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const smQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY) || '(max-width: 599px)';
    const mdQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_ONLY) ||
      '(min-width: 600px) and (max-width: 1023px)';
    const lgQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_ONLY) ||
      '(min-width: 1024px) and (max-width: 1439px)';
    const xlQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.XL_UP) || '(min-width: 1440px)';

    const updateResponsiveState = () => {
      const small = matchMedia(smQuery).matches;
      setIsSmall(small);

      if (matchMedia(xlQuery).matches) {
        setScreenRange('xl');
      } else if (matchMedia(lgQuery).matches) {
        setScreenRange('lg');
      } else if (matchMedia(mdQuery).matches) {
        setScreenRange('md');
      } else if (small) {
        setScreenRange('sm');
      }
    };

    updateResponsiveState();
    window.addEventListener('resize', updateResponsiveState);

    return () => {
      window.removeEventListener('resize', updateResponsiveState);
    };
  }, []);

  const itemLabels = useMemo(() => {
    if (screenRange === 'xl') {
      return ['Home', 'Quick Reference Guide', 'Library', 'Style Lab', 'Frequently Asked Questions'];
    }
    if (screenRange === 'md') {
      return ['Home', 'Guide', 'Lib', 'Styles', 'FAQ'];
    }
    return ['Home', 'Quick Reference Guide', 'Library', 'Style Lab', 'FAQ'];
  }, [screenRange]);
  const display = isSmall ? 'icons' : 'all';

  const handleAdvancedChanged = (event: ButtonsetManyValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setIsAdvanced(event.detail.value ?? []);
    }
  };

  return (
    <div id="buttons-container">
      <h6>Multiple Buttons</h6>
      <div>
        <oj-buttonset-many
          id="formatsetMultipleButtons"
          value={['bold', 'italic']}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <h6>Toggle(Single Button)</h6>
      <oj-buttonset-many id="advancedWrapper" value={isAdvanced} onvalueChanged={handleAdvancedChanged}>
        <oj-option value="advanced">Advanced mode</oj-option>
      </oj-buttonset-many>

      <h6>Buttonset Width</h6>
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with class <code>oj-buttonset-width-auto</code> which should be
            used to make Buttonset Button&apos;s widths fit their contents.
          </p>
        </div>
        <oj-buttonset-many
          chroming="borderless"
          class="oj-buttonset-width-auto"
          id="formatsetWidth1"
          value={['bold', 'italic']}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with class <code>oj-buttonset-width-equal</code> which should be
            used to make Buttonset Button&apos;s widths equal.
          </p>
        </div>
        <oj-buttonset-many
          chroming="borderless"
          class="oj-buttonset-width-equal"
          id="formatsetWidth2"
          value={['bold', 'italic']}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <h6>Responsive</h6>
      <div class="oj-sm-margin-6x-bottom">
        <oj-buttonset-many
          id="itemset"
          value={['Home', 'Library']}
          class="oj-buttonset-width-auto"
          display={display}
          aria-label="Choose only one item."
        >
          {responsiveItems.map((item: ResponsiveItem, index: number) => (
            <oj-option key={item.id} value={item.id}>
              <span slot="startIcon" class={item.icon} />
              <span>{itemLabels[index]}</span>
            </oj-option>
          ))}
        </oj-buttonset-many>
      </div>

      <h6>Labelled Buttonset</h6>
      <oj-label-value labelEdge="top">
        <oj-label slot="label" id="mainlabelid">
          Drinks
        </oj-label>
        <oj-buttonset-many slot="value" id="buttonsetLabelDemoId" labelledBy="mainlabelid" value={['coffee', 'tea']}>
          {drinkOptions.map((option: DrinkOption) => (
            <oj-option key={option.id} id={option.id} value={option.value}>
              {option.drink}
            </oj-option>
          ))}
        </oj-buttonset-many>
      </oj-label-value>
    </div>
  );
};

export default ToggleButtonsManyOverview;
