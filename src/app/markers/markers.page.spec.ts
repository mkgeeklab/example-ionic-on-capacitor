import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarkersPage } from './markers.page';

describe('MarkersPage', () => {
  let component: MarkersPage;
  let fixture: ComponentFixture<MarkersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarkersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
