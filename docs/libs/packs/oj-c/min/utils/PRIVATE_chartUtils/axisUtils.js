define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPreactAxisProps = void 0;
    const getPreactAxisProps = (axisProps) => {
        const newProps = {};
        const { tickLabel, ...rest } = axisProps;
        if (tickLabel?.converter) {
            if (Array.isArray(tickLabel.converter)) {
                newProps['format'] = [
                    (value) => tickLabel.converter[0]?.format?.(new Date(value).toISOString()),
                    (value) => tickLabel.converter[1]?.format?.(new Date(value).toISOString())
                ];
            }
            else {
                newProps['format'] = (value) => tickLabel.converter?.format?.(axisProps['timeAxisType'] ? new Date(value).toISOString() : value);
            }
        }
        newProps['isRendered'] = tickLabel?.rendered != 'off';
        newProps['style'] = tickLabel?.style;
        newProps['rotation'] = tickLabel?.rotation != 'none' ? 'autoRotate' : 'none';
        return { tickLabel: newProps, ...rest };
    };
    exports.getPreactAxisProps = getPreactAxisProps;
});
