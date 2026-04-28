import type { JSX } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojlegend';

type FruitItem = {
  fruit: string;
};

const fruits: FruitItem[] = [
  { fruit: 'Blueberries' },
  { fruit: 'Kiwis' },
  { fruit: 'Bananas' },
  { fruit: 'Apples' },
  { fruit: 'Grapes' }
];

const dataProvider = new ArrayDataProvider<string, FruitItem>(fruits, {
  keyAttributes: 'fruit'
});
const colorHandler = new ColorAttributeGroupHandler();

export const LegendDefault = (): JSX.Element => {
  const itemTemplateRenderer = ($current: { data: FruitItem }): JSX.Element => (
    <oj-legend-item
      shortDesc={$current.data.fruit}
      text={$current.data.fruit}
      color={colorHandler.getValue($current.data.fruit)}
    />
  );

  return (
    <div id="legend-container">
      <oj-legend id="legend1" orientation="vertical" data={dataProvider}>
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-legend>
    </div>
  );
};

export default LegendDefault;
