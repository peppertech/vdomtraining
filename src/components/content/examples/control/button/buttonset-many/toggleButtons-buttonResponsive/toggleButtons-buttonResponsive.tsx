import 'ojs/ojbutton';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojselectcombobox';
import 'preact';
import { type ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ResponsiveItem = {
  id: string;
  icon: string;
};
type VehicleItem = {
  id: string;
};
type VehicleOption = {
  value: string;
  label: string;
};
type ButtonsetManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>
>[0];

const itemValues: ResponsiveItem[] = [
  { id: 'Home', icon: 'oj-ux-ico-home' },
  { id: 'Guide', icon: 'oj-ux-ico-education' },
  { id: 'Library', icon: 'oj-ux-ico-library' },
  { id: 'Styles', icon: 'oj-ux-ico-color-palette' },
  { id: 'FAQ', icon: 'oj-ux-ico-chat' }
];
const vehicleValues: VehicleItem[] = [
  { id: 'Bus' },
  { id: 'Bike' },
  { id: 'Car' },
  { id: 'Truck' }
];
const vehicleOptions: VehicleOption[] = vehicleValues.map((item: VehicleItem) => ({
  value: item.id,
  label: item.id
}));

export const ToggleButtonsButtonResponsive = () => {
  const [screenRange, setScreenRange] = useState('lg');
  const [isSmall, setIsSmall] = useState(false);
  const [vehicleChoice, setVehicleChoice] = useState<string[]>(['Bus', 'Bike']);
  const vehicleValuesDP = useMemo(
    () =>
      new ArrayDataProvider(vehicleOptions, {
        keyAttributes: 'value'
      }),
    []
  );

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

  const vehicleLabels = useMemo(
    () => (screenRange === 'xl' || screenRange === 'lg' ? ['Autobus', 'Bicycle', 'Carriage', 'Cargo Vehicle'] : ['Bus', 'Bike', 'Car', 'Truck']),
    [screenRange]
  );
  const display = isSmall ? 'icons' : 'all';

  const handleVehicleChoiceChanged = (event: ButtonsetManyValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setVehicleChoice(event.detail.value ?? []);
    }
  };

  return (
    <div id="buttons-container">
      <div class="oj-typography-bold oj-sm-margin-2x-bottom">
        Current screen width:
        <span>{screenRange.toUpperCase()}</span>
      </div>
      <p>
        In this example, the labels are shortened as the screen shrinks from extra large to medium, and
        are hidden entirely on small screens (by setting the Buttons&apos;{' '}
        <code className={"prettyprint"}>display</code> option to <code className={"prettyprint"}>icons</code>).
      </p>

      <div class="oj-sm-margin-6x-bottom">
        <oj-buttonset-many
          id="itemset"
          value={['Home', 'Library']}
          class="oj-buttonset-width-auto"
          display={display}
          aria-label="Choose only one item."
        >
          {itemValues.map((item: ResponsiveItem, index: number) => (
            <oj-option key={item.id} value={item.id}>
              <span slot="startIcon" class={item.icon} />
              <span>{itemLabels[index]}</span>
            </oj-option>
          ))}
        </oj-buttonset-many>
      </div>

      <p>This demo replaces the Buttonset with a Select on small screens.</p>

      {!isSmall ? (
        <oj-buttonset-many
          id="vehicleset"
          class="oj-buttonset-width-auto"
          value={vehicleChoice}
          onvalueChanged={handleVehicleChoiceChanged}
          display={display}
          aria-label="Select only one vehicle."
        >
          {vehicleValues.map((item: VehicleItem, index: number) => (
            <oj-option key={item.id} value={item.id}>
              <span>{vehicleLabels[index]}</span>
            </oj-option>
          ))}
        </oj-buttonset-many>
      ) : (
        <oj-select-many
          id="select"
          value={vehicleChoice}
          onvalueChanged={handleVehicleChoiceChanged}
          labelHint="Select vehicles"
          options={vehicleValuesDP}
          class="oj-form-control-max-width-sm"
        />
      )}
    </div>
  );
};

export default ToggleButtonsButtonResponsive;
