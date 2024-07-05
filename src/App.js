import React, { useState, useEffect } from "react";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if advice is already in LocalStorage
    const cachedAdvice = localStorage.getItem("advice");
    if (cachedAdvice) {
      setAdvice(cachedAdvice);
    }
  }, []);

  const clearDataHandler = () => {
    localStorage.removeItem("myData");
    setAdvice(null);
    setCount(0);
  };

  const clickHandler = async () => {
    setLoading(true);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    const newAdvice = data.slip.advice;
    setAdvice(newAdvice);
    setCount((c) => c + 1);
    localStorage.setItem("advice", newAdvice);
    setLoading(false);
  };

  return (
    <div>
      <h1>{loading ? "Loading..." : advice}</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div>
          <button onClick={clickHandler} disabled={loading}>
            {loading ? "Fetching..." : "Get Advice"}
          </button>
        </div>
        <div>
          <button onClick={clearDataHandler} disabled={loading}>
            Cleare Data
          </button>
        </div>
      </div>

      <div>
        <p>
          you have read <strong>{count}</strong> pieces of advice
        </p>
      </div>
    </div>
  );
};

export default App;
