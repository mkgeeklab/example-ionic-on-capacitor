import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { Hotel, HotelService } from '../extras/hotel';

@Component({
  selector: 'hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfo implements OnInit {

  pictureBaseUrl: string = '';
  data: Hotel | undefined = undefined;

  constructor() { }

  ngOnInit() {
  }

  public setData(pictureBaseUrl: string, data: Hotel) {
    this.pictureBaseUrl = pictureBaseUrl;
    this.data = data;
  }
}
