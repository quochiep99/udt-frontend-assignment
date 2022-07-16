function AppCalculatorKey(props) {
  const { onClick, className, ...other } = props;

  return (
    <button
      className={`calculator-key ${className}`}
      {...other}
      type="submit"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
}

export default AppCalculatorKey;
