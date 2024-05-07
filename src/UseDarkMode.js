// useDarkMode.js
import { useState, useEffect } from "react";

function useDarkMode() {
  const getInitialDarkModeState = () => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkModeState);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
}

export default useDarkMode;
