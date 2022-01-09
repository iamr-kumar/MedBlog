import React, { useContext, createContext } from "react";

const AlertContext = createContext();

const { Provider } = AlertContext;

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = React.useState(null);

  const onSetAlert = (alerts) => {
    console.log(alerts);
    setAlert(alerts);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return <Provider value={{ alert, onSetAlert }}>{children}</Provider>;
};

export default AlertProvider;
