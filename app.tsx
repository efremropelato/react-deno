// @deno-types="https://raw.githubusercontent.com/Soremwar/deno_types/4a50660/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@17.0.0";

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Hello React-Deno Land!</h1>
      <button onClick={() => setCount(count + 1)}>Click the 🦕</button>
      <p>You clicked the 🦕 {count} {count > 1? 'time':'times'}</p>
    </div>
  );
};

export default App;
