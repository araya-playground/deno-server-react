import { React, FunctionComponent, useState } from "../../deps.ts";

export const CounterPage: FunctionComponent = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    if (count === 0) return;
    setCount(count - 1);
  }

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement} disabled={count === 0}>
        Decrement
      </button>
      <p>count: {count}</p>
    </div>
  );
};
