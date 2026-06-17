import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import { ojPopup } from 'ojs/ojpopup';
import 'ojs/ojchart';
import 'ojs/ojpopup';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface ChartItem {
    id: string;
    value: number;
    group: string;
    series: string;
}
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type ChartSelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onselectionChanged']>>[0];
type ChartClickEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onClick']>>[0];
type ChartKeyDownEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onKeyDown']>>[0];
type ChartItemTemplateContext = {
    data: ChartItem;
};
const chartData = JSON.parse(chartDataText as string) as ChartItem[];
export const ChartPopup = () => {
    const popupRef = useRef<(HTMLElement & ojPopup) | null>(null);
    const popupContentRef = useRef<HTMLDivElement | null>(null);
    const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>([]);
    const data = chartData;
    const dataProvider = useMemo(() => new ArrayDataProvider<ChartItem['id'], ChartItem>(data, {
        keyAttributes: 'id'
    }), [data]);
    const idToItemMap = useMemo<Record<string, ChartItem>>(() => data.reduce<Record<string, ChartItem>>((acc, current) => {
        acc[current.id] = current;
        return acc;
    }, {}), [data]);
    const handleSelectedItemsValueSelectionChanged = (event: ChartSelectionChangedEvent) => {
        setSelectedItemsValue(event.detail.value ?? []);
    };
    const getTooltip = () => {
        return { preventDefault: true };
    };
    const openPopup = (event: ChartClickEvent | ChartKeyDownEvent) => {
        let dataItemContext: ChartItem | undefined;
        const selection = selectedItemsValue;
        if (selection.length > 0) {
            const id = selection[0];
            dataItemContext = idToItemMap[String(id)];
        }
        const popup = popupRef.current;
        const popupContent = popupContentRef.current;
        if (!popup || !popupContent) {
            return;
        }
        let popupText: string | undefined;
        let pageX: number | undefined;
        let pageY: number | undefined;
        if (dataItemContext && event instanceof MouseEvent) {
            popupText =
                'Value: ' +
                    dataItemContext.value +
                    "<br/><a href='https://www.oracle.com' target='_blank'>www.oracle.com</a>";
            popupContent.innerHTML = popupText;
            pageX = event.pageX;
            pageY = event.pageY;
        }
        else if (dataItemContext && event instanceof KeyboardEvent && event.key === 'Enter') {
            popupText =
                'Value: ' +
                    dataItemContext.value +
                    "<br/><a href='https://www.oracle.com' target='_blank'>www.oracle.com</a>";
            popupContent.innerHTML = popupText;
            const target = event.target as HTMLElement | null;
            pageX = (target?.offsetWidth ?? 0) / 2.3;
            pageY = (target?.offsetHeight ?? 0) / 3;
        }
        if (popupText != null && pageX != null && pageY != null) {
            popup.open(popup, {
                of: { x: pageX, y: pageY },
                my: { horizontal: 'center', vertical: 'bottom' },
                at: { horizontal: 'center' },
                collision: 'none'
            });
        }
    };
    const handleChartClick: NonNullable<ComponentProps<'oj-chart'>['onClick']> = (event) => {
        openPopup(event);
    };
    const handleChartKeyDown: NonNullable<ComponentProps<'oj-chart'>['onKeyDown']> = (event) => {
        openPopup(event);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { tooltip: {
            renderer: getTooltip
        } };
    const itemTemplateRenderer = (item: ChartItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<>
          <div id="chart-container">
                <oj-chart id="chart1" onClick={handleChartClick} onKeyDown={handleChartKeyDown} animationOnDisplay="auto" animationOnDataChange="auto" selectionMode="single" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} data={dataProvider} {...OjChartProps}>
                        <template slot="itemTemplate" render={itemTemplateRenderer}/>
                    </oj-chart>
            </div>
          <oj-popup ref={popupRef} id="popup1" tail="simple" modality="modeless">
              <div ref={popupContentRef} />
          </oj-popup>
      </>);
};
export default ChartPopup;
