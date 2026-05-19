// @ts-nocheck
import { h } from 'preact';

export const messagebannerDetailListRecipe = (
  <>
    <ul>
      <li>
        Create an
        <code className={"prettyprint"}>oj-message-banner</code>
        element
      </li>
      <li>
        Create a
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        consisting of an Array of messages data and bind it to the
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#data"}>data</a>
        attribute of the
        <code className={"prettyprint"}>oj-message-banner</code>
        element
      </li>
      <li>
        Note that the data row consists of an additional property other than those specified in the
        <code className={"prettyprint"}>MessageBannerItem</code>
        type:
        <code className={"prettyprint"}>detailList</code>
        . This property will be used for populating the list of error messages in the detail area.
      </li>
      <li>
        In the HTML, provide a named template slot for rendering a list of messages in the detail area.
        In this demo, we have the template slot named as
        <b>detailList</b>
        which renders a list of text.
      </li>
      <li>
        Set the
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#detailTemplateValue"}>
          detail-template-value
        </a>
        attribute to the name of the template slot be used, in this case, it is
        <b>detailList</b>
        . When specified a string, the component will use the same template slot for rendering the
        detail content of all the messages.
      </li>
      <li>
        Now to include new items to the list, update the
        <code className={"prettyprint"}>detailList</code>
        property of the same row to include the new item. This will update the same message and add the
        new item to the list shown in the detail area.
      </li>
      <li>
        See
        <a href={"#"}>Page Messages</a>
        demo for various attributes that can be used for customizing the content of the messages.
      </li>
    </ul>
  </>
);
