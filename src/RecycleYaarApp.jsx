import React, { useState, useEffect } from "react";
export default function RecycleYaarApp() {
  const [flatNo, setFlatNo] = useState("");
  const [plasticBottles, setPlasticBottles] = useState(0);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("recycle_yaar_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("recycle_yaar_history", JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  function changeQty(delta) {
    setPlasticBottles((prev) => Math.max(0, prev + delta));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!flatNo.trim()) {
      setMessage({ type: "warn", text: "Please enter your flat number." });
      return;
    }
    if (plasticBottles === 0) {
      setMessage({ type: "warn", text: "Add at least 1 bottle before submitting." });
      return;
    }

    const entry = {
      id: Date.now(),
      flatNo: flatNo.trim(),
      plasticBottles,
      total: plasticBottles,
      time: new Date().toISOString(),
    };

    setHistory((h) => [entry, ...h]);
    setMessage({ type: "success", text: "Saved!" });
    setPlasticBottles(0);
    setSelected(null);
  }

  function clearHistory() {
    if (typeof window !== "undefined" && window.confirm("Clear all entries?")) {
      setHistory([]);
      localStorage.removeItem("recycle_yaar_history");
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1>RecycleYaar</h1>
    </div>
  );
}
