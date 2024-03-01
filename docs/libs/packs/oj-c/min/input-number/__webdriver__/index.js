"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInputNumber = exports.InputNumberWebElement = void 0;
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
var InputNumberWebElement_1 = require("./InputNumberWebElement");
Object.defineProperty(exports, "InputNumberWebElement", { enumerable: true, get: function () { return InputNumberWebElement_1.InputNumberWebElement; } });
/**
 * Retrieve an instance of [InputNumberWebElement](../classes/InputNumberWebElement.html).
 * @example
 * ```javascript
 * import { findInputNumber } from '@oracle/oraclejet-core-pack/webdriver';
 * const el = await findInputNumber(driver, By.id('my-oj-c-input-number'));
 * ```
 * @param driver A WebDriver/WebElement instance from where the element will be
 * searched. If WebDriver is passed, the element will be searched globally in the
 * document. If WebElement is passed, the search will be relative to this element.
 * @param by The locator with which to find the element
 */
async function findInputNumber(driver, by) {
    const webEl = await driver.findElement(by);
    // Check that the element is of type InputNumberWebElement
    if (!(webEl instanceof InputNumberWebElement_1.InputNumberWebElement)) {
        const tagName = await webEl.getTagName();
        let supplemental = '';
        if (webEl.constructor.name === 'InputNumberWebElement') {
            supplemental = 'You likely have multiple installations of this package.';
        }
        throw Error(`findInputNumber(${by}) created ${webEl.constructor.name} for <${tagName}>, but expected ${InputNumberWebElement_1.InputNumberWebElement.name}. ${supplemental}`);
    }
    return webEl;
}
exports.findInputNumber = findInputNumber;
(0, oraclejet_webdriver_1.register)('oj-c-input-number', InputNumberWebElement_1.InputNumberWebElement);
//# sourceMappingURL=index.js.map