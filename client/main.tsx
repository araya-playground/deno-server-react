import { type FunctionComponent, render } from "../deps.ts";

const root = document.getElementById("root");

const App: FunctionComponent = () => {
  return <div>Hello World</div>;
};

if (!root) {
  throw new Error("Root element not found");
} else {
  render(<App />, root);
}
