import { h } from "preact";

type Props = {
  testId?: string;
  message?: string;
};

const Attributes = (props: Props) => {
  return (
    <div id={props.testId}>
      <p>{props.message}</p>
      <p>The code will look something like this:</p>
      <div class="oj-panel">
        <code>
          {"return ("}
          <br />
          &nbsp;{"<div id={props.testId}>"}
          <br />
          &nbsp;&nbsp;{"{props.message}"}
          <br />
          &nbsp;{"</div>"}
          <br />
          {");"}
        </code>
      </div>
      <p>with the value for the id and the message sent in as props</p>
    </div>
  );
};
export default Attributes;
