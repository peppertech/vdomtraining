import 'preact';
import { useState } from 'preact/hooks';
import "oj-c/checkbox"
import 'spcheckbox';
import 'mdcheckbox';
import {Checkbox} from '@spectrum-web-components/checkbox/src/Checkbox';
import {MdCheckbox} from '@material/web/checkbox/checkbox.js'

export function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);

  return (
    <div>
      Current value: {count}
      <button onClick={increment}>Increment</button>
      <oj-c-checkbox value={true} onvalidChanged={increment}></oj-c-checkbox>
      <md-checkbox checked onClick={increment}></md-checkbox>
      <sp-checkbox size="l" checked  onClick={increment}></sp-checkbox>
    </div>
  );
}