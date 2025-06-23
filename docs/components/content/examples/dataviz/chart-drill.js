define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojattributegrouphandler", "ojs/ojmutablearraydataprovider", "text!./data/drillData.json", "ojs/ojbutton", "ojs/ojchart"], function (require, exports, jsx_runtime_1, hooks_1, ojattributegrouphandler_1, MutableArrayDataProvider, data) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrillChart = void 0;
    const dataProvider = new MutableArrayDataProvider([], {
        keyAttributes: "id",
    });
    const colorHandler = new ojattributegrouphandler_1.ColorAttributeGroupHandler();
    const years = ["2012", "2013", "2014", "2015"];
    const getYearlyItems = () => {
        const chartData = JSON.parse(data);
        const items = [];
        for (let i = 0; i < chartData.length; i += 4) {
            const year = years[i / 4];
            chartData[i].color = colorHandler.getValue(year);
            chartData[i].group = year;
            chartData[i].series = "Total Revenue";
            chartData[i].value =
                chartData[i].value +
                    chartData[i + 1].value +
                    chartData[i + 2].value +
                    chartData[i + 3].value;
            items.push(chartData[i]);
        }
        dataProvider.data = items;
    };
    const getQuarterlyItems = (year) => {
        const start = (year - 2012) * 4;
        const chartData = JSON.parse(data).slice(start, start + 4);
        for (let i = 0; i < chartData.length; i++) {
            chartData[i].color = colorHandler.getValue(year.toString());
            chartData[i].series = year;
        }
        dataProvider.data = chartData;
    };
    const renderChartItem = (item) => {
        return ((0, jsx_runtime_1.jsx)("oj-chart-item", { groupId: [item.data.group || item.data.quarter], seriesId: item.data.series, color: item.data.color, value: item.data.value }));
    };
    const DrillChart = () => {
        const [isDisabled, setIsDisabled] = (0, hooks_1.useState)(true);
        const [drillingValue, setDrillingValue] = (0, hooks_1.useState)("groupsOnly");
        const [titleValue, setTitleValue] = (0, hooks_1.useState)("Annual");
        const [tickLabelStyle, setTickLabelStyle] = (0, hooks_1.useState)({
            textDecoration: "underline",
            color: "#045fab",
        });
        const xaxisConfig = {
            tickLabel: {
                rotation: "auto",
                rendered: "on",
                style: tickLabelStyle,
            },
        };
        (0, hooks_1.useEffect)(() => {
            getYearlyItems();
        }, []);
        const drillUpButtonClick = (event) => {
            getYearlyItems();
            setDrillingValue("groupsOnly");
            setTitleValue("Annual");
            setTickLabelStyle({ textDecoration: "underline", color: "#045fab" });
            setIsDisabled(true);
        };
        const chartDrillAction = (event) => {
            getQuarterlyItems(Number(event.detail.group));
            setDrillingValue("off");
            setTitleValue(event.detail.group);
            setTickLabelStyle({});
            setIsDisabled(false);
        };
        return ((0, jsx_runtime_1.jsx)("div", { class: "oj-md-margin-4x-horizontal", children: (0, jsx_runtime_1.jsxs)("div", { id: "chart-container", children: [(0, jsx_runtime_1.jsxs)("div", { class: "oj-typography-heading-xs", children: [titleValue, " Revenue"] }), (0, jsx_runtime_1.jsx)("oj-toolbar", { "aria-controls": "barChart", children: !isDisabled && ((0, jsx_runtime_1.jsx)("oj-button", { id: "drillUpButton", onojAction: drillUpButtonClick, chroming: "outlined", children: "Return" })) }), (0, jsx_runtime_1.jsx)("oj-chart", { id: "barChart", type: "bar", orientation: "vertical", data: dataProvider, drilling: drillingValue, xAxis: xaxisConfig, onojGroupDrill: chartDrillAction, legend: { rendered: "off" }, children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderChartItem }) })] }) }));
    };
    exports.DrillChart = DrillChart;
});
