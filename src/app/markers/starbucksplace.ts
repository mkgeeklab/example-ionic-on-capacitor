import { ILatLng } from "@open-google-maps-plugin/capacitor";

export interface StarbucksPlace {
  position: ILatLng;
  name: string;
  address: string;
  class: string;
  id: string;
}
