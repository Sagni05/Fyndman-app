import "./testing.css";
import { useState } from "react";

export default function Testing() {
  const [data, setData] = useState({
    "What are you doing!": 4,
    "Hello i am fine": 1,
  });
  const [dikhna, setDiskna] = useState(false);
  const show = () => {
    setDiskna(!dikhna);
  };

  const change = (i, line) => {
    setData({ ...data, [line]: i });
  };
  return (
    <div className="App">
      <h2> Data </h2>
      {Object.keys(data).map((val, i) => (
        <span
          key={val}
          onMouseEnter={show}
          className="line"
          style={{ color: data[val] === 4 ? "green" : "red" }}
        >
          {val}
          <div className="tooltip">
            <button
              onClick={() => {
                change(1, val);
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                change(2, val);
              }}
            >
              2
            </button>
            <button
              onClick={() => {
                change(3, val);
              }}
            >
              3
            </button>
            <button
              onClick={() => {
                change(4, val);
              }}
            >
              4
            </button>
          </div>
        </span>
      ))}
    </div>
  );
}
