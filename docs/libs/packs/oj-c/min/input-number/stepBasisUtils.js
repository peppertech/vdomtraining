define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.determineSteppedValue = void 0;
    function determineSteppedValue(step, stepOpt, currentParsedValue, initialValue, maxOpt, minOpt) {
        const precision = _precision(stepOpt, initialValue, minOpt);
        if (precision > 0) {
            const power = Math.pow(10, precision);
            const minOptPower = minOpt !== undefined ? Math.round(minOpt * power) : minOpt;
            const maxOptPower = maxOpt != null ? Math.round(maxOpt * power) : maxOpt;
            const stepOptPower = Math.round(stepOpt * power);
            const adjustValuePower = _adjustValueForZeroPrecision(Math.round(step * power), stepOptPower, Math.round(currentParsedValue * power), initialValue !== undefined && initialValue !== null
                ? Math.round(initialValue * power)
                : initialValue, maxOptPower, minOptPower);
            return adjustValuePower / power;
        }
        return _adjustValueForZeroPrecision(step, stepOpt, currentParsedValue, initialValue, maxOpt, minOpt);
    }
    exports.determineSteppedValue = determineSteppedValue;
    function _adjustValueForZeroPrecision(step, stepOpt, currentParsedValue, initialValue, maxOpt, minOpt) {
        let stepBase = minOpt != null ? minOpt : initialValue;
        if (stepBase === null || stepBase === undefined) {
            stepBase = 0;
        }
        try {
            currentParsedValue = parseFloat(currentParsedValue.toFixed(0));
        }
        catch (e) {
            if (e instanceof TypeError) {
                currentParsedValue = +currentParsedValue;
            }
        }
        let aboveMin = currentParsedValue - stepBase;
        let rounded = Math.round(aboveMin / stepOpt) * stepOpt;
        rounded = parseFloat(rounded.toFixed(0));
        const multiple = rounded === aboveMin;
        let newValue;
        if (!multiple) {
            if (step < 0) {
                aboveMin = Math.ceil(aboveMin / stepOpt) * stepOpt;
            }
            else {
                aboveMin = Math.floor(aboveMin / stepOpt) * stepOpt;
            }
            newValue = stepBase + aboveMin + step;
        }
        else {
            newValue = currentParsedValue + step;
        }
        newValue = parseFloat(newValue.toFixed(0));
        if (minOpt != null && newValue < minOpt) {
            return minOpt;
        }
        if (maxOpt != null && newValue > maxOpt) {
            let validMax = Math.floor((maxOpt - stepBase) / stepOpt) * stepOpt + stepBase;
            validMax = parseFloat(validMax.toFixed(0));
            return validMax;
        }
        return newValue;
    }
    function _precision(stepOpt, initialValue, minOpt) {
        let precision = _precisionOf(stepOpt);
        if (minOpt != null) {
            precision = Math.max(precision, _precisionOf(minOpt));
        }
        if (initialValue != null) {
            precision = Math.max(precision, _precisionOf(initialValue));
        }
        return precision;
    }
    function _precisionOf(num) {
        const str = num.toString();
        const decimal = str.indexOf('.');
        return decimal === -1 ? 0 : str.length - decimal - 1;
    }
});
