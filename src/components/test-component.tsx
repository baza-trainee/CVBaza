"use client";

import { useTheme } from "next-themes";

const TestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Змінити тему
      </button>
    </div>
  );
};

export default TestComponent;
