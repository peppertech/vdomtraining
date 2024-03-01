"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTextWebElement = void 0;
var InputTextWebElementBase_1 = require("./InputTextWebElementBase");
var selenium_webdriver_1 = require("selenium-webdriver");
/**
 * The component WebElement for [oj-c-input-text](../../../oj-c/docs/oj.InputText.html).
 * Do not instantiate this class directly, instead, use
 * [findInputText](../functions/findInputText.html).
 */
class InputTextWebElement extends InputTextWebElementBase_1.InputTextWebElementBase {
    /**
     * Sets the value of the "value" property of the input component.
     * @param value The value to set for the <code>value</code>
     */
    async changeValue(value) {
        await this.getDriver().executeScript('arguments[0].focus()', this);
        const readonly = await this.getReadonly();
        const disabled = await this.getDisabled();
        if (!(disabled || readonly)) {
            await this.whenBusyContextReady();
            // Note that using element.clear() will blur, which commits the change and
            // calls onValueChanged, which we don't want until we're done updating the value.
            // Instead, we simulate the user clearing the text in the field and typing
            // in a new value. We mock committing the value by calling validate().
            let currValue = await this.getProperty('rawValue');
            while (currValue) {
                const backspaces = new Array(currValue.length + 1).join(selenium_webdriver_1.Key.BACK_SPACE);
                // First move the cursor to the end, then backspaces.
                await this.sendKeys([selenium_webdriver_1.Key.END, backspaces].join(''));
                currValue = await this.getProperty('rawValue');
            }
            const input = await this.findElement(selenium_webdriver_1.By.css('input'));
            value && (await input.sendKeys(value));
            return this.getDriver().executeAsyncScript(`
        let el = arguments[0];
        let done = arguments[1];
        el.validate().then(done).catch(done);
      `, this);
        }
    }
    /**
     * Clears the value of the component.
     */
    clear() {
        return this.changeValue(null);
    }
}
exports.InputTextWebElement = InputTextWebElement;
//# sourceMappingURL=InputTextWebElement.js.map