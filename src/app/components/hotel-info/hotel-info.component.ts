import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfo implements OnInit {

  @Input() name: string;
  @Input() stars: number;
  @Input() price: string;
  constructor() { }

  ngOnInit() {}

}
