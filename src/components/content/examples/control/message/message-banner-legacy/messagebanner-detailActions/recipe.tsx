// @ts-nocheck
import 'preact';

export const messagebannerDetailActionsRecipe = (
  <>
    <ul>
      <li>
        Create an
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        element
      </li>
      <li>
        Create a
        {" "}
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        {" "}
        consisting of an Array of messages data and bind it to the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#data"}>data</a>
        {" "}
        attribute of the
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        element
      </li>
      <li>
        Note that the data row consists of additional properties other than those specified in the
        {" "}
        <code className={"prettyprint"}>MessageBannerItem</code>
        {" "}
        type. They are
        {" "}
        <code className={"prettyprint"}>actions</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>detailLink</code>
        . These properties will be used for customizing the detail content.
      </li>
      <li>
        In the HTML, provide named template slots for handling each customization. In this demo, we have
        two template slots:
        {" "}
        <b>actions</b>
        {" "}
        template for creating messages with action items and
        {" "}
        <b>detailLink</b>
        {" "}
        template for creating messages with a link appended to the detail text.
      </li>
      <li>
        Specify a function that can determine the name of the template slot to be used based on the
        message data and bind it to the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#detailTemplateValue"}>
          detail-template-value
        </a>
        {" "}
        attribute of the
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        component
      </li>
      <li>
        See
        {" "}
        <a href={"#"}>Page Messages</a>
        {" "}
        demo for various attributes that can be used for customizing the content of the messages.
      </li>
    </ul>
  </>
);
