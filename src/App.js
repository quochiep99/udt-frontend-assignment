import { BrowserRouter, Routes, Route } from "react-router-dom";

// MY COMPONENTS
import AppCalculator from "./AppCalculator";
import AppCalculatorHistory from "./AppCalculatorHistory";

// PROVIDERS
import { CalculatorContextProvider } from "./contexts/CalculatorContext";

function App() {
  return (
    <BrowserRouter>
      <CalculatorContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Hello world</h1>
                <AppCalculator />
              </>
            }
          />
          <Route path="/history" element={<AppCalculatorHistory />} />
        </Routes>
      </CalculatorContextProvider>
    </BrowserRouter>
  );
}

export default App;
