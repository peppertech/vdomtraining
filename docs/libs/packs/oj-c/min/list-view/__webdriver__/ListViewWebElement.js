"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListViewWebElement = void 0;
var ListViewWebElementBase_1 = require("./ListViewWebElementBase");
var selenium_webdriver_1 = require("selenium-webdriver");
var oraclejet_webdriver_1 = require("@oracle/oraclejet-webdriver");
/**
 * The component WebElement for [oj-c-list-view](../../../oj-c/docs/oj.ListView.html).
 * Do not instantiate this class directly, instead, use
 * [findListView](../functions/findListView.html).
 */
class ListViewWebElement extends ListViewWebElementBase_1.ListViewWebElementBase {
    // Put overrides here
    /**
     * Sets the value of "selected" property.
     * Specifies the current selected items in the listview. See the Help documentation for more information.
     * @param selected The value to set for "selected"
     * @override
     * @typeparam K Type of keys
     */
    async changeSelected(selected) {
        await this.whenReady();
        await this.getDriver().executeScript(`
        const ele = arguments[0];
        const selected = arguments[1];
        require(['ojs/ojkeyset'], (keySet) => {
          ele.selected = new keySet.KeySetImpl(selected);
        });
      `, this, selected);
    }
    /**
     * Gets the value of "selected" property.
     * Retrieves the current selected items in the listview. See the Help documentation for more information.
     * @override
     * @typeparam K Type of keys
     * @return The value of "selected" property.
     */
    async getSelected() {
        await this.whenReady();
        const selected = await this.getDriver().executeScript(`
      const ele = arguments[0];
      const selected = ele.selected.isAddAll() ? Array.from(ele.selected.deletedValues())
      : Array.from(ele.selected.values())
      return selected;
    `, this);
        return selected;
    }
    /**
     * Retrieve a SlotProxy which represents a single listview item.
     * @param key The key within the Collection's dataset associated with the item.
     */
    async findItem(itemLocator) {
        await this.whenReady();
        let el = await this.getDriver().executeScript(`
      const ele = arguments[0].querySelectorAll('[role = row]')
      for(let i = 0; i<ele.length; i++){
        if(ele[i].getAttribute('data-oj-key') === arguments[1].toString()){
          return ele[i];
        }
      }
    `, this, itemLocator.key);
        if (el) {
            el = el.findElement(selenium_webdriver_1.By.css('[role="gridcell"]'));
            return (0, oraclejet_webdriver_1.slotProxy)(el, this);
        }
        else {
            throw Error(`No corresponding item found for the itemLocator`);
        }
    }
}
exports.ListViewWebElement = ListViewWebElement;
//# sourceMappingURL=ListViewWebElement.js.map