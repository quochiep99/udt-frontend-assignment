// MY COMPONENTS
import AppCalculatorDisplay from "./components/AppCalculatorDisplay";
import AppCalculatorKey from "./components/AppCalculatorKey";

// HOOKS
import useCalculator from "./hooks/useCalculator";

import "./style.css";

function AppCalculator() {
  const {
    isTouched,
    input,
    clearInput,
    updateOperator,
    updateOperand,
    updateComma,
    updateNegation,
    updatePercent,
    evaluateExpression,
  } = useCalculator();
  const clearText = !isTouched ? "AC" : "C";
  let displayedValue = 0;
  if (isTouched) {
    displayedValue = input.toString().replace(".", ",");
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="paper"
      onClick={() => {
        clearInput();
      }}
    >
      <div className="calculator">
        <div style={{ margin: "16px" }}>
          <span
            // className="rounded-full inline-block w-3 h-3 "
            style={{
              backgroundColor: "rgb(255, 95, 86)",
              display: "inline-block",
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
            }}
          />{" "}
          <span
            style={{
              backgroundColor: "rgb(255, 189, 46)",
              display: "inline-block",
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              marginLeft: "8px",
            }}
          />{" "}
          <span
            style={{
              backgroundColor: "rgb(39, 201, 63)",
              display: "inline-block",
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              marginLeft: "8px",
            }}
          />
        </div>
        <AppCalculatorDisplay value={displayedValue} />
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <AppCalculatorKey
                className="key-clear"
                onClick={() => {
                  clearInput();
                }}
              >
                {clearText}
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-sign"
                onClick={() => {
                  updateNegation();
                }}
              >
                ±
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-percent"
                onClick={() => {
                  updatePercent();
                }}
              >
                %
              </AppCalculatorKey>
            </div>
            <div className="digit-keys">
              <AppCalculatorKey
                className="key-0"
                onClick={() => {
                  updateOperand("0");
                }}
              >
                0
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-comma"
                onClick={() => {
                  updateComma();
                }}
              >
                ,
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-1"
                onClick={() => {
                  updateOperand("1");
                }}
              >
                1
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-2"
                onClick={() => {
                  updateOperand("2");
                }}
              >
                2
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-3"
                onClick={() => {
                  updateOperand("3");
                }}
              >
                3
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-4"
                onClick={() => {
                  updateOperand("4");
                }}
              >
                4
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-5"
                onClick={() => {
                  updateOperand("5");
                }}
              >
                5
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-6"
                onClick={() => {
                  updateOperand("6");
                }}
              >
                6
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-7"
                onClick={() => {
                  updateOperand("7");
                }}
              >
                7
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-8"
                onClick={() => {
                  updateOperand("8");
                }}
              >
                8
              </AppCalculatorKey>
              <AppCalculatorKey
                className="key-9"
                onClick={() => {
                  updateOperand("9");
                }}
              >
                9
              </AppCalculatorKey>
            </div>
          </div>
          <div className="operator-keys">
            <AppCalculatorKey
              className="key-divide"
              onClick={() => {
                updateOperator("/");
              }}
            >
              ÷
            </AppCalculatorKey>
            <AppCalculatorKey
              className="key-multiply"
              onClick={() => {
                updateOperator("*");
              }}
            >
              ×
            </AppCalculatorKey>
            <AppCalculatorKey
              className="key-subtract"
              onClick={() => {
                updateOperator("-");
              }}
            >
              −
            </AppCalculatorKey>
            <AppCalculatorKey
              className="key-add"
              onClick={() => {
                updateOperator("+");
              }}
            >
              +
            </AppCalculatorKey>
            <AppCalculatorKey
              className="key-equals"
              onClick={() => {
                evaluateExpression();
              }}
            >
              =
            </AppCalculatorKey>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppCalculator;
