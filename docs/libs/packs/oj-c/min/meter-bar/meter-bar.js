define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MeterBar", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "css!oj-c/meter-bar/meter-bar-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MeterBar_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterBar = void 0;
    exports.MeterBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-meter-bar', ({ max = 100, value = 0, min = 0, size = 'md', orientation = 'horizontal', step = 1, indicatorSize = 1, readonly = false, thresholdDisplay = 'indicator', ...props }) => {
        const [hoveredVal, setHoveredVal] = (0, hooks_1.useState)();
        const inputHandler = (detail) => {
            setHoveredVal(detail.value);
            props.onTransientValueChanged?.(detail.value);
        };
        const commitHandler = (detail) => {
            props.onValueChanged?.(detail.value);
        };
        const thresholds = props.thresholds?.map((threshold, index) => {
            return {
                ...threshold,
                color: (0, meterUtils_1.getThresholdColorByIndex)(threshold, index)
            };
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { class: `oj-c-meter-bar-${orientation}`, children: (0, jsx_runtime_1.jsx)(UNSAFE_MeterBar_1.MeterBar, { value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, min: min, size: size, orientation: orientation, indicatorSize: indicatorSize, datatip: props.datatip
                    ? props.datatip({
                        value: hoveredVal != undefined ? hoveredVal : value
                    })
                    : props.datatip, onCommit: readonly ? undefined : commitHandler, onInput: readonly ? undefined : inputHandler, length: '100%', thresholds: thresholds, referenceLines: props.referenceLines, thresholdDisplay: thresholdDisplay === 'plotArea' ? 'track' : thresholdDisplay, indicatorColor: props.color, trackColor: props.plotArea?.color, isTrackRendered: props.plotArea?.rendered !== 'off', "aria-label": props['aria-label'], "aria-labelledby": props.labelledBy ?? undefined, "aria-describedby": props.describedBy ?? undefined }) }));
    }, "MeterBar", { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "readonly": { "type": "boolean" }, "value": { "type": "number|null", "writeback": true }, "step": { "type": "number" }, "color": { "type": "string" }, "indicatorSize": { "type": "number" }, "plotArea": { "type": "object", "properties": { "color": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["off", "on"] } } }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "referenceLines": { "type": "Array<object>" }, "thresholdDisplay": { "type": "string", "enumValues": ["all", "plotArea", "indicator"] }, "thresholds": { "type": "Array<object>" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "datatip": { "type": "function" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "max": 100, "value": 0, "min": 0, "size": "md", "orientation": "horizontal", "step": 1, "indicatorSize": 1, "readonly": false, "thresholdDisplay": "indicator" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
