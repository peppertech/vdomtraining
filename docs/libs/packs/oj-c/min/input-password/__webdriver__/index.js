"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInputPassword = exports.InputPasswordWebElement = void 0;
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
var InputPasswordWebElement_1 = require("./InputPasswordWebElement");
Object.defineProperty(exports, "InputPasswordWebElement", { enumerable: true, get: function () { return InputPasswordWebElement_1.InputPasswordWebElement; } });
/**
 * Retrieve an instance of [InputPasswordWebElement](../classes/InputPasswordWebElement.html).
 * @example
 * ```javascript
 * import { findInputPassword } from '@oracle/oraclejet-core-pack/webdriver';
 * const el = await findInputPassword(driver, By.id('my-oj-c-input-password'));
 * ```
 * @param driver A WebDriver/WebElement instance from where the element will be
 * searched. If WebDriver is passed, the element will be searched globally in the
 * document. If WebElement is passed, the search will be relative to this element.
 * @param by The locator with which to find the element
 */
async function findInputPassword(driver, by) {
    const webEl = await driver.findElement(by);
    // Check that the element is of type InputPasswordWebElement
    if (!(webEl instanceof InputPasswordWebElement_1.InputPasswordWebElement)) {
        const tagName = await webEl.getTagName();
        let supplemental = '';
        if (webEl.constructor.name === 'InputPasswordWebElement') {
            supplemental = 'You likely have multiple installations of this package.';
        }
        throw Error(`findInputPassword(${by}) created ${webEl.constructor.name} for <${tagName}>, but expected ${InputPasswordWebElement_1.InputPasswordWebElement.name}. ${supplemental}`);
    }
    return webEl;
}
exports.findInputPassword = findInputPassword;
(0, oraclejet_webdriver_1.register)('oj-c-input-password', InputPasswordWebElement_1.InputPasswordWebElement);
//# sourceMappingURL=index.js.map