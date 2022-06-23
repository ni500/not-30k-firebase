import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakisListComponent } from './vakis-list.component';

describe('VakisListComponent', () => {
  let component: VakisListComponent;
  let fixture: ComponentFixture<VakisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VakisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
