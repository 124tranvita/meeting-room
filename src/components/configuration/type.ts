export type Place = {
  id: string;
  emailAddress: string;
  displayName: string;
  geoCoordinates: string | null;
  phone: string;
  nickname: string;
  building: string;
  floorNumber: number;
  floorLabel: string | null;
  label: string | null;
  capacity: number;
  bookingType: string;
  audioDeviceName: string | null;
  videoDeviceName: string | null;
  displayDeviceName: string | null;
  isWheelChairAccessible: boolean;
  tags: [];
  address: {
    street: string;
    city: string;
    state: string;
    countryOrRegion: string;
    postalCode: string;
  };
};
