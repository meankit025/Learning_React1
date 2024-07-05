import React, { useState, useEffect } from "react";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if advice is already in LocalStorage
    const cachedAdvice = localStorage.getItem("advice");
    if (cachedAdvice) {
      setAdvice(cachedAdvice);
    }
  }, []);

  const clickHandler = async () => {
    setLoading(true);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    const newAdvice = data.slip.advice;
    setAdvice(newAdvice);
    localStorage.setItem("advice", newAdvice);
    setLoading(false);
  };

  return (
    <div>
      <h1>{loading ? "Loading..." : advice}</h1>
      <div>
        <button onClick={clickHandler} disabled={loading}>
          {loading ? "Fetching..." : "Get Advice"}
        </button>
      </div>
    </div>
  );
};

export default App;
