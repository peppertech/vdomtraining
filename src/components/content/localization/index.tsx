import { h } from "preact";
import { useState } from 'preact/hooks';
import * as MenuBundle from "ojL10n!../../resources/nls/menu";
import * as Translations from "ojs/ojtranslation";
import "ojs/ojformlayout";
import "ojs/ojmenu";
import "ojs/ojdatetimepicker";
import { MenuButtonElement } from "ojs/ojbutton";

const Localization = () => {



  const [btnLocaleLabel, setBtnLocaleLabel] = useState(MenuBundle.label);

  // Named message token example
  const parMyUserKey = { username: 'Foo', groupname: 'Test' };
  const tmpString = Translations.applyParameters(MenuBundle.MyUserKey, parMyUserKey);
  const transNamedMessageToken = Translations.getTranslatedString(tmpString);

  // Example usage of numeric message tokens
  /**
   *  Tip: Use of named message tokens (orderNum and itemQuantity in
   *  the following example) can improve code readability and reuse
   */
  const parMyKey = { 0: 1977, 1: 540, orderNum: 1978, itemQuantity: 546 }
  const tmpString2 = Translations.applyParameters(MenuBundle.MyKey, parMyKey);
  const MyKey = Translations.getTranslatedString(tmpString2);

  // Escape characters in resource bundle strings
  let parEscapeChar = {};
  let EscapeChar = Translations.applyParameters(MenuBundle.EscapeChar, parEscapeChar)

  // Substitute a token and escape a character
  let parEscapeCharToken = { bookName: "Oracle JET Developer's Guide" };
  let EscapeCharToken = Translations.applyParameters(MenuBundle.EscapeCharToken, parEscapeCharToken)

  // Format translated strings. Resource bundle entry for a book title includes italics
  const FormatTranslatedStringComponent = () => {
    let parBookTitle = { 'booktitle': 'Oracle JET Developer Guide' };
    const formattedString = Translations.applyParameters(MenuBundle.FormatTranslatedString, parBookTitle);
    return (
      <span dangerouslySetInnerHTML={{ __html: formattedString }} />
    );
  };
  const formattedString = FormatTranslatedStringComponent();

  // Select a department:  Menu button (Sales, Human Resources, and Transportation )
  const menuNames = [
    { itemName: MenuBundle.menu1, id: 'menu1' },
    { itemName: MenuBundle.menu2, id: 'menu2' },
    { itemName: MenuBundle.menu3, id: 'menu3' },
  ];

  // change label on the oj-menu-button component
  const changeLabel = (event: MenuButtonElement.ojAction) => {
    let val = event.detail.selectedValue;
    setBtnLocaleLabel(val);
  };



  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h1 class="oj-typography-heading-lg"> Localization </h1>
      <hr />
      <p>Oracle JET includes support for internationalization (I18N), localization (L10N), and use of Oracle National Language Support (NLS) translation bundles in Oracle JET apps. Learn <a href="https://www.oracle.com/pls/topic/lookup?ctx=jetlatest&id=JETVD-GUID-30498436-BE77-43BF-A541-1AFABF62DFBE" target="_blank">more</a>. </p>

      <p>
        This component (<strong>Localization</strong>) renders a number of UI components that use string values from the resource bundle in <code>./ vdomtraining/src/components/resources</code>{' '}
        for the selected locale. The flag menu at the top of the screen (English, French, and so on) sets the locale in the browser's local storage and reloads the app. On reload, the app's <code>./src/main.js</code> file
        uses an <code>localeOverride</code> function to get the current specified locale.
      </p>

      <p>Select a flag to see the language and locale changes below</p>
      <hr />
      <div>
        <div>
          <div id="buttons-container">
            <oj-form-layout columns={1}>
              <oj-menu-button id="menuButton1">{btnLocaleLabel}
                <oj-menu id="myMenu1" slot="menu" onojMenuAction={changeLabel}>
                  {menuNames.map((menu) => (
                    <oj-option value={menu.itemName}>
                      {menu.itemName}
                    </oj-option>
                  ))}
                </oj-menu>
              </oj-menu-button>
            </oj-form-layout>
          </div>
        </div>
      </div>
      <oj-input-date-time id="dateInput1" label-hint={MenuBundle.dateHint}
        class="oj-sm-width-full oj-md-width-1/4"></oj-input-date-time>
      <hr></hr>
      <ul>
        <li>
          <p>Example usage of named message tokens:</p>
          <p>
            <span>
              {transNamedMessageToken}
            </span>
          </p>
        </li>
        <li>
          <p>Example usage of numeric message tokens:</p>
          <p>
            <span>
              {MyKey}
            </span>
          </p>
        </li>
        <li>
          <p>Escape characters in resource bundle strings</p>
          <p>
            <span>
              {EscapeChar}
            </span>
          </p>
        </li>
        <li>
          <p>Substitute a token and escape a character</p>
          <p>
            <span>
              {EscapeCharToken}
            </span>
          </p>
        </li>
        <li>
          <p>
            Format translated strings. The following output shows how to italicize
            a string that is in the translation bundle.
          </p>
          <p><span>
            {formattedString}
          </span></p>

          <p><strong>Warning: </strong> It is the application's responsibility to sanitize the HTML input to prevent unsafe content being added to the page.
            Use of the {" "}<a target="_blank" href="https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html"><code>dangerouslySetInnerHTML</code></a>{" "} prop, as demonstrated here, is not recommended in a production application.</p>

        </li>
      </ul>
    </div>
  );

};
export default Localization;

