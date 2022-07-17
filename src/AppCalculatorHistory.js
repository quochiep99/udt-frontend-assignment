// HOOKS
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function AppCalculatorHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    try {
      const newHistory = JSON.parse(localStorage.getItem("history") ?? "[]");
      setHistory(newHistory);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setHistory([]);
      localStorage.removeItem("history");
    }
  }, []);
  return (
    <div style={{ margin: "auto", maxWidth: "800px" }}>
      <h1 style={{ marginTop: "24px" }}>Calculation History</h1>
      <Link to="/">
        <h3 style={{ marginTop: "24px" }}>Back Home</h3>
      </Link>
      {/* eslint-disable-next-line no-nested-ternary */}
      {history.length === 0 ? (
        <h3 style={{ fontWeight: 300 }}>Empty</h3>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {history.map((el) => {
            return (
              <li
                style={{
                  border: "1px solid black",
                  borderRadius: "16px",
                  listStyleType: "none",
                  marginTop: "8px",
                }}
                key={el.id}
              >
                <h1
                  style={{ paddingLeft: "8px" }}
                >{`${el.expressionString}=${el.expressionResult}`}</h1>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AppCalculatorHistory;
