"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRadioset = exports.RadiosetWebElement = void 0;
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
var RadiosetWebElement_1 = require("./RadiosetWebElement");
Object.defineProperty(exports, "RadiosetWebElement", { enumerable: true, get: function () { return RadiosetWebElement_1.RadiosetWebElement; } });
/**
 * Retrieve an instance of [RadiosetWebElement](../classes/RadiosetWebElement.html).
 * @example
 * ```javascript
 * import { findRadioset } from '@oracle/oraclejet-core-pack/webdriver';
 * const el = await findRadioset(driver, By.id('my-oj-c-radioset'));
 * ```
 * @param driver A WebDriver/WebElement instance from where the element will be
 * searched. If WebDriver is passed, the element will be searched globally in the
 * document. If WebElement is passed, the search will be relative to this element.
 * @param by The locator with which to find the element
 */
async function findRadioset(driver, by) {
    const webEl = await driver.findElement(by);
    // Check that the element is of type RadiosetWebElement
    if (!(webEl instanceof RadiosetWebElement_1.RadiosetWebElement)) {
        const tagName = await webEl.getTagName();
        let supplemental = '';
        if (webEl.constructor.name === 'RadiosetWebElement') {
            supplemental = 'You likely have multiple installations of this package.';
        }
        throw Error(`findRadioset(${by}) created ${webEl.constructor.name} for <${tagName}>, but expected ${RadiosetWebElement_1.RadiosetWebElement.name}. ${supplemental}`);
    }
    return webEl;
}
exports.findRadioset = findRadioset;
(0, oraclejet_webdriver_1.register)('oj-c-radioset', RadiosetWebElement_1.RadiosetWebElement);
//# sourceMappingURL=index.js.map