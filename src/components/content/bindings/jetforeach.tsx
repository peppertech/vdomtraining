import { h } from "preact";

const JETforeach = () => {
  return (
    <div>
      <p>
        JET also provided a binding element for iterating over an array of data.
        The oj-bind-for-each element looked something like the below code.
      </p>
      <div class="oj-panel oj-sm-margin-4x-bottom">
        <code>
          {
            <div>
              {'<oj-bind-for-each data="[[itemList]]">'}
              <br />
              &nbsp;{'<template data-oj-as="item">'}
              <br />
              &nbsp;&nbsp;{'<div :id="[[item.detail.id]]">'}
              <br />
              &nbsp;&nbsp;&nbsp;
              {'<oj-bind-text value="[[item.detail.message]]"></oj-bind-text>'}
              <br />
              &nbsp;&nbsp;{"</div>"}
              <br />
              &nbsp;{"</template>"}
              <br />
              {"</oj-bind-for-each>"}
            </div>
          }
        </code>
      </div>
    </div>
  );
};
export default JETforeach;
