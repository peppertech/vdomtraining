// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojpictochart';
import 'ojs/ojtoolbar';

type PictoChartItem = {
  id: string;
  name: string;
  color: string;
  count: number;
};

export const PictoChartAnimation = () => {
  const setNumberRef = useRef(5);
  const itemsPerSetNumberRef = useRef(10);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const generateData = (setCount: number, itemCount: number): PictoChartItem[] => {
    setNumberRef.current = setCount;
    itemsPerSetNumberRef.current = itemCount;

    return Array.from({ length: setCount }, (_unused: unknown, index: number) => {
      const name = `Set ${index + 1}`;
      return {
        id: name,
        name,
        color: colorHandler.getValue(name),
        count: itemCount
      };
    });
  };

  const [pictoChartItems, setPictoChartItems] = useState<PictoChartItem[]>(() =>
    generateData(setNumberRef.current, itemsPerSetNumberRef.current)
  );

  const dataProvider = useMemo(
    () => new ArrayDataProvider(pictoChartItems, { keyAttributes: 'id' }),
    [pictoChartItems]
  );

  const renderItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-picto-chart-item
      name={item.data.name}
      shape="circle"
      color={item.data.color}
      count={item.data.count}
    />
  );

  const handleSetsButtonClick = () => {
    const nextSetCount = setNumberRef.current === 10 ? 5 : 10;
    setPictoChartItems(generateData(nextSetCount, itemsPerSetNumberRef.current));
  };

  const handleItemsButtonClick = () => {
    const nextItemCount = itemsPerSetNumberRef.current === 10 ? 20 : 10;
    setPictoChartItems(generateData(setNumberRef.current, nextItemCount));
  };

  return (
    <div id="chart-container">
      <oj-toolbar chroming="outlined" aria-label="Button Controls Toolbar" aria-controls="pictochart">
        <oj-button id="button1" onojAction={handleSetsButtonClick}>
          Add/Remove Items
        </oj-button>
        <oj-button id="button2" onojAction={handleItemsButtonClick}>
          Add/Remove Counts
        </oj-button>
      </oj-toolbar>
      <oj-picto-chart
        id="pictochart"
        class="demo-picto-chart-fixed-width"
        data={dataProvider}
        animation-on-display="auto"
        animation-on-data-change="auto"
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-picto-chart>
    </div>
  );
};

export default PictoChartAnimation;
