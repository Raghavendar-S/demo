import { createContext, useState, useContext } from "react";

const RecoveryContext = createContext();

export const useRecovery = () => {
  return useContext(RecoveryContext);
};

export const RecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState(null);

  return (
    <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP}}>
      {children}
    </RecoveryContext.Provider>
  );
};
