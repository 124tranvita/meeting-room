import { useCallback, useMemo, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Event } from "@microsoft/microsoft-graph-types";

axios.defaults.baseURL = "https://graph.microsoft.com/v1.0/me";

const useOutlookCalendarSync = () => {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState<
    AxiosResponse<{
      value: Event[];
    }>
  >();

  const accessTokenRequest = useMemo(() => {
    return {
      scopes: ["user.read", "calendars.read", "Calendars.ReadWrite"],
      account: accounts[0],
    };
  }, [accounts]);

  const callCalendarApi = useCallback(
    (params: AxiosRequestConfig) => {
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          const accessToken = accessTokenResponse.accessToken;

          params = {
            ...params,
            headers: {
              ...params.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          };
          // Call your API with token
          axios.request(params).then((response) => {
            setApiData(response);
          });
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenPopup(accessTokenRequest)
              .then((accessTokenResponse) => {
                // Acquire token silent success
                const accessToken = accessTokenResponse.accessToken;

                params = {
                  ...params,
                  headers: {
                    ...params.headers,
                    Authorization: `Bearer ${accessToken}`,
                  },
                };
                // Call your API with token
                axios.request(params).then((response) => {
                  setApiData(response);
                });
              })
              .catch(function (error) {
                // Acquire token interactive failure
                console.log(error);
              });
          }
          console.log(error);
        });
    },
    [accessTokenRequest, instance]
  );

  return { apiData, inProgress, callCalendarApi };
};

export default useOutlookCalendarSync;
