import 'preact';
import { useCallback, useEffect, useState, useMemo } from 'preact/hooks';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type DataItem = {
    id: number;
    series: string;
    group: string;
    value: number;
};

export type Data = Array<DataItem>;

type Props = {
  type: string;
  data: Data;
};

export function LSChart({data, type}:Props) {

    const dataProvider = useMemo(() => {
        return new MutableArrayDataProvider<string, DataItem>(data, {
            keyAttributes: 'id',
        })
    }, [data]
    );



    useEffect(() => {
        //dataProvider.data = data;
    }, [data]);

    const renderLine = useCallback((item: ojChart.ItemTemplateContext) => {
        return (
            <oj-chart-item
                key={item.key}
                value={item.data.value}
                seriesId={item.data.series}
                groupId={[item.data.group]}
            />
        );
    }, []);

    //console.log(dataProvider);

    return (
        <oj-chart
            stack="off"
            animationOnDisplay="auto"
            hoverBehavior="dim"
            legend={{ position: 'top' }}
            type="bar"
            data={dataProvider}
        >
            <template slot="itemTemplate" render={renderLine} />
        </oj-chart>
    );
}