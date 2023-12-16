import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import { Button, CenterContainer, Typography } from "../../common/components";
import { useCallApi, useDeviceConfigContext } from "../../hooks";
import { Events } from "../../common/constants";
import { ACT_SET_CONFIG } from "../../context/deviceConfigContext/constants";
import { DeviceConfig } from "../../common/model";
import { Place } from "./type";

type GraphPlaceRes = {
  value: Place[];
};

const Configuration: FC = () => {
  const { dispatchConfig } = useDeviceConfigContext();
  const { fetchData, response, error, loading } = useCallApi<
    GraphPlaceRes | DeviceConfig
  >();
  const [eventId, setEventId] = useState<Events>(Events.Init);
  const [places, setPlaces] = useState<Place[]>([]);
  const [pickerValue, setPickerValue] = useState({
    room: "",
  });

  console.log({ error });

  useEffect(() => {
    fetchData({
      method: "GET",
      url: "/device/places",
      headers: {
        accept: "*/*",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (eventId === Events.Init && response) {
      setPlaces([...places, ...(response as GraphPlaceRes).value]);
      setEventId(Events.None);
    }

    if (eventId === Events.Submit && response) {
      dispatchConfig({
        type: ACT_SET_CONFIG,
        payload: response as DeviceConfig,
      });
      localStorage.setItem("deviceConfig", JSON.stringify(response));
      setEventId(Events.None);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const pullDownItems = useMemo(() => {
    if (!places || places.length < 1) return [];

    return places.map((item: Place) => {
      return {
        label: item.displayName,
        value: item.id,
      };
    });
  }, [places]);

  /** Handle submit form */
  const hanldSubmit = useCallback(() => {
    try {
      setEventId(Events.Submit);
      fetchData({
        method: "POST",
        url: "/device/configuration",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        data: {
          roomId: pickerValue.room,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [fetchData, pickerValue.room]);

  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <CenterContainer>
      <div className="mb-6">
        <Typography text="Select meeting room" type="name" />
      </div>
      <Picker value={pickerValue} onChange={setPickerValue} wheelMode="natural">
        <Picker.Column key={"room"} name={"room"}>
          {pullDownItems.map((item) => (
            <Picker.Item key={item.value} value={item.value}>
              {item.label}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
      <Button
        type="submit"
        label="Save"
        variant="primary"
        onClick={hanldSubmit}
      />
    </CenterContainer>
  );
};

export default Configuration;
