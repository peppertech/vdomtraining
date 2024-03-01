"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSelectMultiple = exports.SelectMultipleWebElement = void 0;
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
var SelectMultipleWebElement_1 = require("./SelectMultipleWebElement");
Object.defineProperty(exports, "SelectMultipleWebElement", { enumerable: true, get: function () { return SelectMultipleWebElement_1.SelectMultipleWebElement; } });
/**
 * Retrieve an instance of [SelectMultipleWebElement](../classes/SelectMultipleWebElement.html).
 * @example
 * ```javascript
 * import { findSelectMultiple } from '@oracle/oraclejet-core-pack/webdriver';
 * const el = await findSelectMultiple(driver, By.id('my-oj-c-select-multiple'));
 * ```
 * @param driver A WebDriver/WebElement instance from where the element will be
 * searched. If WebDriver is passed, the element will be searched globally in the
 * document. If WebElement is passed, the search will be relative to this element.
 * @param by The locator with which to find the element
 */
async function findSelectMultiple(driver, by) {
    const webEl = await driver.findElement(by);
    // Check that the element is of type SelectMultipleWebElement
    if (!(webEl instanceof SelectMultipleWebElement_1.SelectMultipleWebElement)) {
        const tagName = await webEl.getTagName();
        let supplemental = '';
        if (webEl.constructor.name === 'SelectMultipleWebElement') {
            supplemental = 'You likely have multiple installations of this package.';
        }
        throw Error(`findSelectMultiple(${by}) created ${webEl.constructor.name} for <${tagName}>, but expected ${SelectMultipleWebElement_1.SelectMultipleWebElement.name}. ${supplemental}`);
    }
    return webEl;
}
exports.findSelectMultiple = findSelectMultiple;
(0, oraclejet_webdriver_1.register)('oj-c-select-multiple', SelectMultipleWebElement_1.SelectMultipleWebElement);
//# sourceMappingURL=index.js.map