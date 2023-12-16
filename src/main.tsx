import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App.tsx";
import "./index.css";
import { DeviceConfigProvider } from "./context/index.ts";

// Configuration object constructed.
const config = {
  auth: {
    // clientId: "2386ab9f-8d17-44e9-a22b-3e1c8bc1fce3",
    clientId: "69e654a7-e6df-4cd3-bf36-3e9c13caf5b3",
  },
};

// create PublicClientApplication instance
const publicClientApplication = new PublicClientApplication(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <MsalProvider instance={publicClientApplication}>
    <DeviceConfigProvider>
      <App />
    </DeviceConfigProvider>
  </MsalProvider>
  // </React.StrictMode>
);
