import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import { JetElementCustomEvent } from 'ojs/index';
import { ojChart } from 'ojs/ojchart';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojchart';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type ChartDatum = {
    id: number;
    group: string;
    series: string;
    value: number;
};
type ChartItemContext = {
    subId: 'oj-chart-item';
    itemIndex: number;
    seriesIndex: number;
};
type ChartGroupContext = {
    subId: 'oj-chart-group';
    indexPath: number[];
};
type ChartSeriesContext = {
    subId: 'oj-chart-series';
    index: number;
};
type ChartContext = ChartItemContext | ChartGroupContext | ChartSeriesContext;

const data = JSON.parse(dataText as string) as ChartDatum[];
export const ChartContextMenu = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
    const [item, setItem] = useState<ChartDatum | null>(null);
    const [group, setGroup] = useState<ChartDatum | null>(null);
    const [series, setSeries] = useState<ChartDatum | null>(null);
    const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>([]);

    const jsonData = data;
    const dataProvider = useMemo(() => new ArrayDataProvider(jsonData, {
        keyAttributes: 'id'
    }), [jsonData]);
    const idToItemMap = useMemo<Record<number, ChartDatum>>(() => jsonData.reduce((acc: Record<number, ChartDatum>, current) => {
        acc[current.id] = current;
        return acc;
    }, {}), [jsonData]);

    const handleSelectedItemsValueSelectionChanged = (event: JetElementCustomEvent<ComponentProps<'oj-chart'>['selection']>) => {
        setSelectedItemsValue(event.detail.value ?? []);
    };

    const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
        const target = event.detail.originalEvent.target as HTMLElement | null;
        if (!target) {
            return;
        }
        if (target.id === 'chart1') {
            // Handle keyboard interaction.
            const selection = selectedItemsValue;
            if (selection.length > 0) {
                const id = selection[0];
                setItem(idToItemMap[id] ?? null);
            }
        }
        else {
            // Handle mouse interaction.
            const chart = document.getElementById('chart1') as ojChart<string, Record<string, string | number>, null, null>;
            const context = chart.getContextByNode(target) as ChartContext | null;
            if (context != null) {
                if (context.subId === 'oj-chart-item') {
                    setItem(jsonData[context.itemIndex + 2 * context.seriesIndex] ?? null);
                }
                else if (context.subId === 'oj-chart-group') {
                    setGroup(jsonData[context.indexPath[0]] ?? null);
                }
                else if (context.subId === 'oj-chart-series') {
                    setSeries(jsonData[context.index * 2] ?? null);
                }
            }
        }
    };

    const menuItemAction = (event: ojMenu.ojMenuAction) => {
        const text = event.detail.selectedValue;
        if (item) {
            setSelectedMenuItem(`${text} from ${item.series}, ${item.group}`);
            setItem(null);
        }
        else if (group) {
            setSelectedMenuItem(`${text} from ${group.group}`);
            setGroup(null);
        }
        else if (series) {
            setSelectedMenuItem(`${text} from ${series.series}`);
            setSeries(null);
        }
        else {
            setSelectedMenuItem(`${text} from chart background`);
        }
    };
    const itemTemplateRenderer = (item: ojChart.ItemTemplateContext) => {
        return (
            <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
        )
    };

    return (
        <div id="chart-container">
            <oj-chart
                id="chart1"
                animationOnDisplay="auto"
                animationOnDataChange="auto"
                selectionMode="single"
                onselectionChanged={handleSelectedItemsValueSelectionChanged}
                selection={selectedItemsValue}
                data={dataProvider}>
                <template slot="itemTemplate" render={itemTemplateRenderer} />
                <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
                    <oj-option value="Action 1">Action 1</oj-option>
                    <oj-option value="Action 2">Action 2</oj-option>
                    <oj-option value="Action 3">Action 3</oj-option>
                </oj-menu>
            </oj-chart>
            <p>
                Last selected menu item:
                <span id="results" class="italic"><b>{selectedMenuItem}</b></span>
            </p>
        </div>
    );
};
export default ChartContextMenu;
