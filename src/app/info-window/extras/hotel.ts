import { ILatLng } from "@open-google-maps-plugin/core";

export interface HotelService {
  icon: string;
  label: string;
}
export interface Hotel {
  id: string;
  name: string;
  thumbnail: string;
  position: ILatLng;
  price: number;
  star: number;
  pictures: string[];
  services: HotelService[];
}
