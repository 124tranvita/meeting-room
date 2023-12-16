import { useContext } from "react";
import { DeviceConfigContext } from "../context";

const useDeviceConfigContext = () => {
  const context = useContext(DeviceConfigContext);

  if (!context) {
    throw new Error(
      "useDeviceConfigContext must be used inside the EventContextProvider"
    );
  }

  return context;
};

export default useDeviceConfigContext;
