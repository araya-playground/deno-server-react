import React, {
  type FunctionComponent,
} from "https://cdn.skypack.dev/react@17.0.2?dts";
import { render } from "https://cdn.skypack.dev/react-dom@17.0.1?dts";

const root = document.getElementById("root");

const App: FunctionComponent = () => {
  return <div>Hello World</div>;
};

if (!root) {
  throw new Error("Root element not found");
} else {
  render(<App />, root);
}
