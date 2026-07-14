import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>
        To see how to configure oj-c-tab-bar see the<a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'basic'); return false;">
        oj-c-tab-bar basic demo.
      </a>
      </li>
    <li>
        Overflow
        can be handled by setting the 
        <code>overflow</code>
        attribute to either conveyer or popup.
    </li>
    <li>
        Ensure that the <code>truncation</code> attribute is set to <code>progressive</code> to truncate labels based on available width.
    </li>
    <li>
        NOTE: truncation="progressive" should always be used with overflow="popup" for handling overflow properly. Progressive truncation does not work when tab bar is placed inside conveyor belt as tab bar always gets enough space.
    </li>
  </ol>`;

export const tabBarOverflowcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
