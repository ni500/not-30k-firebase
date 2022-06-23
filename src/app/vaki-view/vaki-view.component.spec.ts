import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakiViewComponent } from './vaki-view.component';

describe('VakiViewComponent', () => {
  let component: VakiViewComponent;
  let fixture: ComponentFixture<VakiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VakiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
