// import { Language, LocaleProvider } from "../services/locale";
import "oj-c/input-text";
import "oj-c/input-number";
import "ojs/ojinputtext";
import "oj-c/button";
import "oj-c/form-layout";
import "oj-c/input-password";
import "ojs/ojactioncard";

type Props = {
  tag: string;
  language: string;
};

function TestButtonBar(props: Props) {
  let myLabel = props.language as string;
  return (
    <div>
      <oj-button
        id="refresh_button"
        label={myLabel}
        onojAction={() => console.log(myLabel)}
      ></oj-button>
      <oj-c-button
        id="refresh_button"
        label={myLabel}
        onojAction={() => console.log(myLabel)}
      ></oj-c-button>
      <oj-input-text labelHint={myLabel}></oj-input-text>
      <oj-c-input-text labelHint="username" autocomplete="on"></oj-c-input-text>
      <oj-action-card>{myLabel}</oj-action-card>
      <oj-c-form-layout labelEdge="start" readonly>
        <oj-c-input-text labelHint="Testing"></oj-c-input-text>
        <oj-c-input-number labelHint="Test number"></oj-c-input-number>
      </oj-c-form-layout>
    </div>
  );
}
export default TestButtonBar;
