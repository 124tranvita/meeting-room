import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";

axios.defaults.baseURL = "https://4100.nezumi.asia/api/v1";

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
const useCallApi = <T,>() => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (axiosParams: AxiosRequestConfig) => {
    try {
      setLoading(true);
      const result = await axios.request(axiosParams);
      setResponse(result.data);
    } catch (error) {
      const errors = error as Error | AxiosError;

      if (!axios.isAxiosError(errors)) {
        setError(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, response, error, loading };
};

export default useCallApi;
