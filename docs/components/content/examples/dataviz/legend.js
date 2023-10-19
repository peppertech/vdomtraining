define(["require", "exports", "preact/jsx-runtime", "ojs/ojattributegrouphandler", "ojs/ojmutablearraydataprovider", "ojs/ojlegend"], function (require, exports, jsx_runtime_1, ojattributegrouphandler_1, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fruits = [
        { fruit: "Blueberries" },
        { fruit: "Kiwis" },
        { fruit: "Bananas" },
        { fruit: "Apples" },
        { fruit: "Grapes" },
    ];
    const dataProvider = new MutableArrayDataProvider(fruits, {
        keyAttributes: "fruit",
    });
    const colorHandler = new ojattributegrouphandler_1.ColorAttributeGroupHandler();
    const getColor = (item) => {
        return colorHandler.getValue(item);
    };
    const renderLegendItem = (item) => {
        if (item) {
            return ((0, jsx_runtime_1.jsx)("oj-legend-item", { text: item.data.fruit, color: getColor(item.data.fruit) }));
        }
    };
    const Legend = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: (0, jsx_runtime_1.jsx)("oj-legend", Object.assign({ id: "legend1", orientation: "vertical", data: dataProvider, symbolHeight: 20, symbolWidth: 20 }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderLegendItem }) })) })));
    };
    exports.default = Legend;
});
