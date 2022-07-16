/* eslint-disable no-param-reassign */
// HOOKS
import { createContext, useMemo, useReducer } from "react";

import produce from "immer";

const operators = ["+", "-", "*", "/"];

const initialState = {
  isTouched: false,
  input: "",
  expression: [],
  expressionResult: 0,
  isEvaluated: false,
};

const handlers = {
  CLEAR_INPUT: () => {
    return initialState;
  },

  UPDATE_OPERATOR: (state, action) => {
    return produce(state, (draft) => {
      const newOperator = action.payload;
      if (draft.expression.length > 0) {
        if (operators.includes(draft.expression[draft.expression.length - 1])) {
          draft.expression[draft.expression.length - 1] = newOperator;
        } else if (
          !Number.isNaN(draft.expression[draft.expression.length - 1])
        ) {
          draft.expression.push(newOperator);
        }
        draft.isEvaluated = false;
      }
    });
  },

  UPDATE_OPERAND: (state, action) => {
    const newOperand = action.payload;
    return produce(state, (draft) => {
      const lastInput = draft.expression[draft.expression.length - 1];
      if (draft.isEvaluated) {
        draft.expression = [];
      }
      if (draft.expression.length === 0 || operators.includes(lastInput)) {
        draft.expression.push(newOperand);
        draft.input = newOperand;
      } else if (!Number.isNaN(lastInput)) {
        draft.expression[draft.expression.length - 1] += newOperand;
        draft.input += newOperand;
      }
      draft.isTouched = true;
    });
  },

  UPDATE_COMMA: (state) => {
    return produce(state, (draft) => {
      const lastInput = draft.expression[draft.expression.length - 1];
      if (draft.expression.length === 0) {
        draft.expression.push("0.");
        draft.input = "0.";
      } else if (!operators.includes(lastInput) && !lastInput.endsWith(".")) {
        draft.expression[draft.expression.length - 1] += ".";
        draft.input += ".";
      }
      draft.isTouched = true;
    });
  },

  UPDATE_NEGATION: (state) => {
    return produce(state, (draft) => {
      if (draft.expression.length > 0) {
        const lastInput = draft.expression[draft.expression.length - 1];
        if (!operators.includes(lastInput)) {
          draft.input = `${Number(draft.input) * -1}`;
          draft.expression[draft.expression.length - 1] = `${
            Number(draft.expression[draft.expression.length - 1]) * -1
          }`;
        }
      }
    });
  },

  UPDATE_PERCENT: (state) => {
    return produce(state, (draft) => {
      if (draft.expression.length > 0) {
        const lastInput = draft.expression[draft.expression.length - 1];
        if (!operators.includes(lastInput)) {
          draft.input = `${Number(draft.input) / 100}`;
          draft.expression[draft.expression.length - 1] = `${
            Number(draft.expression[draft.expression.length - 1]) / 100
          }`;
        }
      }
    });
  },

  EVALUATE_EXPRESSION: (state) => {
    return produce(state, (draft) => {
      // if the expression is already evaluated, then pressing the "=" will do nothing
      if (draft.expression.length > 0) {
        let expressionResult = 0;
        try {
          // eslint-disable-next-line no-eval
          expressionResult = eval(
            draft.expression.toString().replaceAll(",", ""),
          );
          draft.expressionResult = expressionResult;
          draft.input = draft.expressionResult;
        } catch (err) {
          // draft.input = "";
          draft.expression = [];
        } finally {
          draft.isEvaluated = true;
          draft.expression = [expressionResult];
        }
      }
    });
  },
};

const reducer = (state, action) => {
  return handlers[action.type](state, action);
};

const CalculatorContext = createContext({
  ...initialState,
  clearInput: () => {},
  // eslint-disable-next-line no-unused-vars
  updateOperator: (newOperator) => {},
  // eslint-disable-next-line no-unused-vars
  updateOperand: (newOperand) => {},
  updateComma: () => {},
  updateNegation: () => {},
  evaluateExpression: () => {},
});

function CalculatorContextProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearInput = () => {
    dispatch({ type: "CLEAR_INPUT" });
  };
  const updateOperator = (newOperator) => {
    dispatch({ type: "UPDATE_OPERATOR", payload: newOperator });
  };
  const updateOperand = (newOperand) => {
    dispatch({ type: "UPDATE_OPERAND", payload: newOperand });
  };
  const updateComma = () => {
    dispatch({ type: "UPDATE_COMMA" });
  };
  const updateNegation = () => {
    dispatch({ type: "UPDATE_NEGATION" });
  };
  const updatePercent = () => {
    dispatch({ type: "UPDATE_PERCENT" });
  };
  const evaluateExpression = () => {
    dispatch({ type: "EVALUATE_EXPRESSION" });
  };

  const value = useMemo(() => {
    return {
      ...state,
      clearInput,
      updateOperator,
      updateOperand,
      updateComma,
      updateNegation,
      updatePercent,
      evaluateExpression,
    };
  }, [state]);

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export { CalculatorContext, CalculatorContextProvider };
