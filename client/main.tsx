import {
  React,
  type FunctionComponent,
  render,
  Router,
  Routes,
  Route,
} from "../deps.ts";
import { CounterPage } from "./pages/conter.tsx";

declare global {
  interface AbortSignal {
    reason: any;
  }
  interface ReadableStream {
    [Symbol.asyncIterator]: any;
  }
}
const root = document.getElementById("root");

const App: FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        {/* @ts-expect-error */}
        <Route path="/counter" element={<CounterPage />}></Route>
      </Routes>
    </Router>
  );
};

if (!root) {
  throw new Error("Root element not found");
} else {
  render(<App />, root);
}
