function AppCalculatorDisplay(props) {
  const { value, ...other } = props;

  return (
    <div {...other} className="calculator-display">
      {value}
    </div>
  );
}

export default AppCalculatorDisplay;
