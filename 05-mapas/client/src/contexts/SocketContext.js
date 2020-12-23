import React, { createContext } from "react";

import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const { socket } = useSocket('http://localhost:8080');

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
