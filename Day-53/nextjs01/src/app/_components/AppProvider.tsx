"use client";

import { createContext, useState } from "react";
type AppContext = {
  message: string;
  setMessage: (value: string) => void;
};

export const AppContext = createContext({} as AppContext);
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("Hello anh em");
  return (
    <AppContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
