// @ts-nocheck
import { h } from 'preact';

export const messagesCustomIconDescription = (
  <>
    <p>Messages manages the layout and display of child messages.</p><p>
      This demo features 'icon' property of
      {" "}
      <code className={"prettyprint"}>ojMessage.Message</code>
      {" "}
      object.
    </p>
    <p>
      This property can be used to specify the URL of the image file to be used as message icon. When
      not specified, a suitable icon corresponding to value of message.severity will be displayed.
    </p>
    <p>
      The icon will be rendered as background image inside a container that is set to size of 16px*16px
      in alta-web theme and 10px*20px for all other themes. Therefore, any image chosen must fit this
      dimensions.
    </p>
  </>
);
