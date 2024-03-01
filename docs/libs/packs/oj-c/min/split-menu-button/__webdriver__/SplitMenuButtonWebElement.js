"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitMenuButtonWebElement = void 0;
var SplitMenuButtonWebElementBase_1 = require("./SplitMenuButtonWebElementBase");
var selenium_webdriver_1 = require("selenium-webdriver");
/**
 * The component WebElement for [oj-c-split-menu-button](../../../oj-c/docs/oj.SplitMenuButton.html).
 * Do not instantiate this class directly, instead, use
 * [findSplitMenuButton](../functions/findSplitMenuButton.html).
 */
class SplitMenuButtonWebElement extends SplitMenuButtonWebElementBase_1.SplitMenuButtonWebElementBase {
    // Put overrides here
    /**
     * Perform a click on the button action
     */
    async click() {
        // Find the action part of <button> element top element
        const button = await this.findElement(selenium_webdriver_1.By.css('[role=button] span'));
        return button.click();
    }
    /**
     * Helper util
     * */
    async findAsyncSequential(array, predicate) {
        for (const t of array) {
            if (await predicate(t)) {
                return t;
            }
        }
        return undefined;
    }
    /**
     * Fire the ojMenuAction event on the oj-c-menu-button, and
     * invoke the Action handler of the selected value.
     *
     */
    async doMenuAction(selectedValue) {
        // open the menu
        await this.openMenu();
        if (Array.isArray(selectedValue)) {
            for (const value of selectedValue) {
                await this.doMenuClick(value);
            }
        }
        else {
            await this.doMenuClick(selectedValue);
        }
    }
    /**
     * openMenu - opens the menu
     */
    async openMenu() {
        const button = await this.findElements(selenium_webdriver_1.By.css('[role=button] span'));
        await button[1].click();
    }
    /**
     * delay - delays the milliseconds
     * await delay(2000);
     */
    // private delay = (ms: number) => new Promise(fn => setTimeout(fn, ms));
    /**
     * In order to do nested selections, we need an isolated menu clicker
     */
    async doMenuClick(selectedValue) {
        // Find the <menu-item> element to click
        const menuItems = await this.getDriver().findElements(selenium_webdriver_1.By.css('#__root_layer_host [role=menuitem]'));
        const match = await this.findAsyncSequential(menuItems, async (item) => {
            const text = await item.getText();
            return text === selectedValue;
        });
        await match?.click();
    }
}
exports.SplitMenuButtonWebElement = SplitMenuButtonWebElement;
//# sourceMappingURL=SplitMenuButtonWebElement.js.map