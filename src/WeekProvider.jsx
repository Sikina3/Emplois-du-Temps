import { createContext, useState, useContext } from "react";

const WeekContext = createContext();

export const WeekProvider = ({ children }) => {
  const [weeks, setWeeks] = useState("");

  return (
    <WeekContext.Provider value={{ weeks, setWeeks }}>
      {children}
    </WeekContext.Provider>
  );
};

export const useWeeks = () => useContext(WeekContext);
