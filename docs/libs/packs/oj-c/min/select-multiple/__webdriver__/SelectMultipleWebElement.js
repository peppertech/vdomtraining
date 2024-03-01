"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMultipleWebElement = void 0;
var SelectMultipleWebElementBase_1 = require("./SelectMultipleWebElementBase");
/**
 * The component WebElement for [oj-c-select-multiple](../../../oj-c/docs/oj.SelectMultiple.html).
 * Do not instantiate this class directly, instead, use
 * [findSelectMultiple](../functions/findSelectMultiple.html).
 */
class SelectMultipleWebElement extends SelectMultipleWebElementBase_1.SelectMultipleWebElementBase {
    // Put overrides here
    /**
     * Sets the value of the <code>value</code> property.
     * The value of the component.
     * @param value The value to set for <code>value</code>
     * @override
     */
    async changeValue(value) {
        // Call focus() on the root element
        await this.getDriver().executeScript('arguments[0].focus()', this);
        // Only mutate if not readonly/disabled
        const readonly = await this.getReadonly();
        const disabled = await this.getDisabled();
        if (!(readonly || disabled)) {
            await this.whenBusyContextReady();
            await this.getDriver().executeAsyncScript(`
        var element = arguments[0];
        var arValue = arguments[1];
        // the value is passed as an array, not a Set
        var value = arValue != null ? new Set(arValue) : arValue;

        // Last argument will be the done function
        var doneFunc = arguments[arguments.length - 1];
        
        element._selectItemsByValue(value)
          .then(doneFunc, doneFunc)
          .catch(doneFunc);
      `, this, 
            // pass the value as an array, not a Set
            value != null ? Array.from(value.values()) : value);
        }
    }
    /**
     * Clears the value of the component.
     * @override
     */
    clear() {
        return this.changeValue(null);
    }
}
exports.SelectMultipleWebElement = SelectMultipleWebElement;
//# sourceMappingURL=SelectMultipleWebElement.js.map