define(["require", "exports", "preact/jsx-runtime", "ojs/ojmutablearraydataprovider", "text!./data/basicData.json", "ojs/ojchart"], function (require, exports, jsx_runtime_1, MutableArrayDataProvider, data) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const xaxisConfig = {
        tickLabel: { rotation: "auto", rendered: "on" },
    };
    const dataProvider = new MutableArrayDataProvider(JSON.parse(data), {
        keyAttributes: "id",
    });
    const renderChartItem = (item) => {
        return ((0, jsx_runtime_1.jsx)("oj-chart-item", { value: item.data.value, groupId: [item.data.group], seriesId: item.data.series }));
    };
    const Chart = () => {
        return ((0, jsx_runtime_1.jsx)("div", { class: "oj-md-margin-4x-horizontal", children: (0, jsx_runtime_1.jsx)("oj-chart", { "aria-label": "sample bar chart", id: "barChart", type: "bar", orientation: "vertical", stack: "off", data: dataProvider, animationOnDisplay: "auto", animationOnDataChange: "auto", hoverBehavior: "dim", hideAndShowBehavior: "withRescale", xAxis: xaxisConfig, class: "chart-sizing", children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderChartItem }) }) }));
    };
    exports.default = Chart;
});
