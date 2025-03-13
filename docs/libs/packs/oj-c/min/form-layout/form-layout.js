define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_FormLayout", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "css!oj-c/form-layout/form-layout-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_FormLayout_1, Layout_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormLayout = void 0;
    function FormLayoutImpl({ columns = 0, columnSpan = 1, direction = 'row', fullWidth = false, id, maxColumns = 1, ...otherProps }) {
        let preactColumns = maxColumns;
        let preactColumnBehavior = 'responsive';
        if (columns > 0) {
            preactColumns = columns;
            preactColumnBehavior = 'fixed';
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_FormLayout_1.FormLayout, { columns: preactColumns, columnBehavior: preactColumnBehavior, direction: direction, isFullWidth: fullWidth, labelEdge: otherProps.labelEdge, labelStartWidth: otherProps.labelStartWidth, labelWrapping: otherProps.labelWrapping, isReadonly: otherProps.readonly, userAssistanceDensity: otherProps.userAssistanceDensity, children: otherProps.children }) }));
    }
    exports.FormLayout = (0, ojvcomponent_1.registerCustomElement)('oj-c-form-layout', FormLayoutImpl, "FormLayout", { "slots": { "": {} }, "properties": { "columns": { "type": "number" }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "fullWidth": { "type": "boolean" }, "labelEdge": { "type": "string", "enumValues": ["start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" }, "provide": [{ "name": "containerLabelEdge" }, { "name": "labelEdge" }] } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" }, "provide": [{ "name": "labelStartWidth" }, { "name": "labelWidth" }] } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" }, "provide": [{ "name": "labelWrapping" }] } }, "maxColumns": { "type": "number" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" }, "provide": [{ "name": "containerReadonly", "default": false }, { "name": "readonly" }] } }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" }, "provide": [{ "name": "containerUserAssistanceDensity", "default": "efficient" }, { "name": "userAssistanceDensity", "default": "efficient" }] } } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["id"] } }, { "columns": 0, "columnSpan": 1, "direction": "row", "fullWidth": false, "maxColumns": 1 }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
