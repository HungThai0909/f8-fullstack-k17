"use client";

import { useEffect, useState } from "react";

// Đánh dấu component là client
export default function Button({ initCount }: { initCount: number }) {
  //   const [random, setRandom] = useState(0);
  //   useEffect(() => {
  //     localStorage.setItem("abc", "123");
  //     const getRandom = () => {
  //       const value = Date.now();
  //       setRandom(value);
  //     };
  //     getRandom();
  //   }, []);
  const [count, setCount] = useState(initCount);
  return (
    <div>
      <button
        className="px-3 py-2 bg-green-600"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me: {count}
      </button>
    </div>
  );
}

//React.createElement()
