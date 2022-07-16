// HOOKS
import { useContext } from "react";

import { CalculatorContext } from "../contexts/CalculatorContext";

const useCalculator = () => useContext(CalculatorContext);
export default useCalculator;
