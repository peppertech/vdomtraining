"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonWebElement = void 0;
var ButtonWebElementBase_1 = require("./ButtonWebElementBase");
var selenium_webdriver_1 = require("selenium-webdriver");
/**
 * The component WebElement for [oj-c-button](../../../oj-c/docs/oj.Button.html).
 * Do not instantiate this class directly, instead, use
 * [findButton](../functions/findButton.html).
 */
class ButtonWebElement extends ButtonWebElementBase_1.ButtonWebElementBase {
    // Put overrides here
    /**
     * Perform a click on the button
     */
    doAction() {
        return this.click();
    }
    /**
     * Perform a click on the button
     */
    async click() {
        // Find the <button> element to click so that it can receive focus
        const button = await this.findElement(selenium_webdriver_1.By.css('button'));
        return button.click();
    }
}
exports.ButtonWebElement = ButtonWebElement;
//# sourceMappingURL=ButtonWebElement.js.map