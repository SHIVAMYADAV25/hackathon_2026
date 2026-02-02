"use client"
import { UserMode } from "@/context/ModeContext";
import React, { useState } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {

    const [dark, setDark] = useState(false);



  return <div>
    <UserMode.Provider value={{dark,setDark}}>
    {children}
    </UserMode.Provider>
    </div>;
};

export default Provider;
