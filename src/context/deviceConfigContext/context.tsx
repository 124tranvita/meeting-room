import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { DeviceConfig, initialDeviceConfig } from "../../common/model";
import * as Constants from "./constants";

type ContextType = {
  device: DeviceConfig;
  dispatchConfig: Dispatch<ActionType>;
};

type StateType = {
  device: DeviceConfig;
};

type ActionType = {
  type: Constants.Types;
  payload: DeviceConfig;
};

export const DeviceConfigContext = createContext<ContextType>({
  device: initialDeviceConfig,
  dispatchConfig: () => null,
});

const deviceConfigReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case Constants.ACT_SET_CONFIG:
      return { ...state, device: action.payload };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const DeviceConfigProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(deviceConfigReducer, {
    device: { ...initialDeviceConfig },
  });

  useEffect(() => {
    const getDeviceConfigFromLocalStorage = () => {
      try {
        return JSON.parse(localStorage.getItem("deviceConfig") || "");
      } catch (error) {
        return null;
      }
    };
    const config = getDeviceConfigFromLocalStorage();

    console.log({ config });

    if (config) {
      dispatch({
        type: Constants.ACT_SET_CONFIG,
        payload: config,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DeviceConfigContext.Provider
      value={{ ...state, dispatchConfig: dispatch }}
    >
      {children}
    </DeviceConfigContext.Provider>
  );
};
