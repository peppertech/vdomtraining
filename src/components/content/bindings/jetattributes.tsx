import { h } from "preact";

const JETAttr = () => {
  return (
    <div>
      <p>
        When using JET, if you wanted to bind the id of a div, and the content
        inside of that div, you would use a : (colon) in front of the id
        attribute and an oj-bind-text element for the content. It would look
        something like this:
      </p>
      <div class="oj-panel oj-sm-margin-4x-bottom">
        <code>
          {'<div :id="[[testId]]">'}<br/>
          &nbsp;{'<oj-bind-text value="[[message]]"></oj-bind-text>'}<br/>
          {'</div>'}
        </code>
      </div>
    </div>
  );
};
export default JETAttr;