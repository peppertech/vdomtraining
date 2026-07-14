import "ojs/ojformlayout";
import "ojs/ojswitch";
import 'preact';

export default function SwitchReadonlyExample() {
  return (
    <div id="switchContainer">
      <oj-form-layout max-columns="2">
        <oj-switch
          labelHint="Readonly value true"
          labelEdge="inside"
          value={true}
          readonly={true}
        />

        <oj-switch
          labelHint="Readonly value false"
          labelEdge="inside"
          value={false}
          readonly={true}
        />
      </oj-form-layout>
    </div>
  );
}
