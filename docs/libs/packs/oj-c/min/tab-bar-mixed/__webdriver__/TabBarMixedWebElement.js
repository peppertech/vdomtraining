"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBarMixedWebElement = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const TabBarMixedWebElementBase_1 = require("./TabBarMixedWebElementBase");
/**
 * The component WebElement for [oj-c-tab-bar-mixed](../../../oj-c/docs/oj.TabBarMixed.html).
 * Do not instantiate this class directly, instead, use
 * [findTabBarMixed](../modules.html#findTabBarMixed).
 */
class TabBarMixedWebElement extends TabBarMixedWebElementBase_1.TabBarMixedWebElementBase {
    // Put overrides here
    /**
     * Selects tab specified by key.
     * Triggers ojSelectionAction regardless if the key passed is same as the current selection value or not.
     * @param key key of the tab to be selected
     * @override
     * @typeparam K Type of keys
     */
    async doSelection(key) {
        await this.whenReady();
        try {
            const tab = await this.findElement(selenium_webdriver_1.By.css(`[data-oj-key="${key}"]`));
            await tab?.click();
        }
        catch (e) {
            throw new selenium_webdriver_1.error.NoSuchElementError(`Tab with specified key "${key}" cannot be found`);
        }
    }
    /**
     * Removes tab specified by key.
     * @param key key of the tab to be removed
     * @override
     * @typeparam K Type of keys
     */
    async doRemove(key) {
        await this.whenReady();
        try {
            const tab = await this.findElement(selenium_webdriver_1.By.css(`[data-oj-key="${key}"]`));
            const button = tab.findElement(selenium_webdriver_1.By.css('[data-oj-tabbar-item-remove-icon="true"]'));
            await button?.click();
        }
        catch (e) {
            throw new selenium_webdriver_1.error.NoSuchElementError(`Tab with specified key "${key}" cannot be found`);
        }
    }
}
exports.TabBarMixedWebElement = TabBarMixedWebElement;
//# sourceMappingURL=TabBarMixedWebElement.js.map