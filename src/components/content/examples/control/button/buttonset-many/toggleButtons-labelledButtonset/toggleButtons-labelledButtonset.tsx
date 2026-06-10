import { h, type ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';

type DrinkOption = {
  id: string;
  value: string;
  drink: string;
};
type ButtonsetManyValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>
>[0];

const drinkOptions: DrinkOption[] = [
  { id: 'coffeeopt', value: 'coffee', drink: 'Coffee' },
  { id: 'teaopt', value: 'tea', drink: 'Tea' },
  { id: 'milkopt', value: 'milk', drink: 'Milk' }
];

export const ToggleButtonsLabelledButtonset = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['coffee', 'tea']);
  const currentOptions = useMemo(() => selectedOptions.join(' '), [selectedOptions]);

  const handleSelectedOptionsChanged = (event: ButtonsetManyValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setSelectedOptions(event.detail.value ?? []);
    }
  };

  return (
    <div id="buttonsetContainer">
      <div class="oj-sm-margin-4x-bottom">
        <oj-label-value>
          <oj-label id="mainlabelid" slot="label">
            Drinks
          </oj-label>
          <oj-buttonset-many
            id="buttonsetLabelDemoId"
            labelledBy="mainlabelid"
            value={selectedOptions}
            onvalueChanged={handleSelectedOptionsChanged}
            slot="value"
          >
            {drinkOptions.map((option: DrinkOption) => (
              <oj-option key={option.id} id={option.id} value={option.value}>
                {option.drink}
              </oj-option>
            ))}
          </oj-buttonset-many>
        </oj-label-value>
      </div>
      {selectedOptions.length > 0 ? <span>Now serving:</span> : null}
      <span id="curr-value">{currentOptions}</span>
    </div>
  );
};

export default ToggleButtonsLabelledButtonset;
