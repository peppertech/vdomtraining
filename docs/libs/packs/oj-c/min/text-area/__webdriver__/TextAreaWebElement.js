"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaWebElement = void 0;
var TextAreaWebElementBase_1 = require("./TextAreaWebElementBase");
var selenium_webdriver_1 = require("selenium-webdriver");
/**
 * The component WebElement for [oj-c-text-area](../../../oj-c/docs/oj.TextArea.html).
 * Do not instantiate this class directly, instead, use
 * [findTextArea](../functions/findTextArea.html).
 */
class TextAreaWebElement extends TextAreaWebElementBase_1.TextAreaWebElementBase {
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
            const input = await this.findElement(selenium_webdriver_1.By.css('textarea'));
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
exports.TextAreaWebElement = TextAreaWebElement;
//# sourceMappingURL=TextAreaWebElement.js.map