// MY COMPONENTS
import AppCalculator from "./AppCalculator";

// PROVIDERS
import { CalculatorContextProvider } from "./contexts/CalculatorContext";

function App() {
  return (
    <CalculatorContextProvider>
      <h1>Hello world</h1>
      <AppCalculator />
    </CalculatorContextProvider>
  );
}

export default App;
