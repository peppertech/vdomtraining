import 'preact';
import { useState } from 'preact/hooks';
import "oj-c/checkbox"

export function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);

  return (
    <div>
      Current value: {count}
      <button onClick={increment}>Increment</button>
      <oj-c-checkbox value={true} onvalidChanged={increment}></oj-c-checkbox>
    </div>
  );
}