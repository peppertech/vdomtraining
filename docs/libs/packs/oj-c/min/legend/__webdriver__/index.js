"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLegend = exports.LegendWebElement = void 0;
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
var LegendWebElement_1 = require("./LegendWebElement");
Object.defineProperty(exports, "LegendWebElement", { enumerable: true, get: function () { return LegendWebElement_1.LegendWebElement; } });
/**
 * Retrieve an instance of [LegendWebElement](../classes/LegendWebElement.html).
 * @example
 * ```javascript
 * import { findLegend } from '@oracle/oraclejet-core-pack/webdriver';
 * const el = await findLegend(driver, By.id('my-oj-c-legend'));
 * ```
 * @param driver A WebDriver/WebElement instance from where the element will be
 * searched. If WebDriver is passed, the element will be searched globally in the
 * document. If WebElement is passed, the search will be relative to this element.
 * @param by The locator with which to find the element
 */
async function findLegend(driver, by) {
    const webEl = await driver.findElement(by);
    // Check that the element is of type LegendWebElement
    if (!(webEl instanceof LegendWebElement_1.LegendWebElement)) {
        const tagName = await webEl.getTagName();
        let supplemental = '';
        if (webEl.constructor.name === 'LegendWebElement') {
            supplemental = 'You likely have multiple installations of this package.';
        }
        throw Error(`findLegend(${by}) created ${webEl.constructor.name} for <${tagName}>, but expected ${LegendWebElement_1.LegendWebElement.name}. ${supplemental}`);
    }
    return webEl;
}
exports.findLegend = findLegend;
(0, oraclejet_webdriver_1.register)('oj-c-legend', LegendWebElement_1.LegendWebElement);
//# sourceMappingURL=index.js.map