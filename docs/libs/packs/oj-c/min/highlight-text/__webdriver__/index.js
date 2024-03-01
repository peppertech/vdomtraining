"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHighlightText = exports.HighlightTextWebElement = void 0;
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
var HighlightTextWebElement_1 = require("./HighlightTextWebElement");
Object.defineProperty(exports, "HighlightTextWebElement", { enumerable: true, get: function () { return HighlightTextWebElement_1.HighlightTextWebElement; } });
/**
 * Retrieve an instance of [HighlightTextWebElement](../classes/HighlightTextWebElement.html).
 * @example
 * ```javascript
 * import { findHighlightText } from '@oracle/oraclejet-core-pack/webdriver';
 * const el = await findHighlightText(driver, By.id('my-oj-c-highlight-text'));
 * ```
 * @param driver A WebDriver/WebElement instance from where the element will be
 * searched. If WebDriver is passed, the element will be searched globally in the
 * document. If WebElement is passed, the search will be relative to this element.
 * @param by The locator with which to find the element
 */
async function findHighlightText(driver, by) {
    const webEl = await driver.findElement(by);
    // Check that the element is of type HighlightTextWebElement
    if (!(webEl instanceof HighlightTextWebElement_1.HighlightTextWebElement)) {
        const tagName = await webEl.getTagName();
        let supplemental = '';
        if (webEl.constructor.name === 'HighlightTextWebElement') {
            supplemental = 'You likely have multiple installations of this package.';
        }
        throw Error(`findHighlightText(${by}) created ${webEl.constructor.name} for <${tagName}>, but expected ${HighlightTextWebElement_1.HighlightTextWebElement.name}. ${supplemental}`);
    }
    return webEl;
}
exports.findHighlightText = findHighlightText;
(0, oraclejet_webdriver_1.register)('oj-c-highlight-text', HighlightTextWebElement_1.HighlightTextWebElement);
//# sourceMappingURL=index.js.map