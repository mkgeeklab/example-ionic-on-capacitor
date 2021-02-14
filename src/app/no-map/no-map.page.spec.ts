import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoMapPage } from './no-map.page';

describe('NoMapPage', () => {
  let component: NoMapPage;
  let fixture: ComponentFixture<NoMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
