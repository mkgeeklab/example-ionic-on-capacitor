import { ILatLng } from "@open-google-maps-plugin/core";

export interface StarbucksPlace {
  position: ILatLng;
  name: string;
  address: string;
  class: string;
  id: string;
}
