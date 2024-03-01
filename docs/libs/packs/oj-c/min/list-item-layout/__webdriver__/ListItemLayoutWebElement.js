"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemLayoutWebElement = void 0;
var ListItemLayoutWebElementBase_1 = require("./ListItemLayoutWebElementBase");
/**
 * The component WebElement for [oj-c-list-item-layout](../../../oj-c/docs/oj.ListItemLayout.html).
 * Do not instantiate this class directly, instead, use
 * [findListItemLayout](../functions/findListItemLayout.html).
 */
class ListItemLayoutWebElement extends ListItemLayoutWebElementBase_1.ListItemLayoutWebElementBase {
    /**
     * Gets the value of <code>primary</code> property.
     * Returns primary text.
     * @return The value of <code>primary</code> property.
     *
     */
    getPrimary() {
        return this.getProperty('primary');
    }
    /**
     * Gets the value of <code>secondary</code> property.
     * Returns secondary text.
     * @return The value of <code>secondary</code> property.
     *
     */
    getSecondary() {
        return this.getProperty('secondary');
    }
    /**
     * Gets the value of <code>tertiary</code> property.
     * Returns tertiary text.
     * @return The value of <code>tertiary</code> property.
     *
     */
    getTertiary() {
        return this.getProperty('tertiary');
    }
    /**
     * Gets the value of <code>quaternary</code> property.
     * Returns quaternary text.
     * @return The value of <code>quaternary</code> property.
     *
     */
    getQuaternary() {
        return this.getProperty('quaternary');
    }
    /**
     * Gets the value of <code>overline</code> property.
     * Returns overline text.
     * @return The value of <code>overline</code> property.
     *
     */
    getOverline() {
        return this.getProperty('overline');
    }
}
exports.ListItemLayoutWebElement = ListItemLayoutWebElement;
//# sourceMappingURL=ListItemLayoutWebElement.js.map