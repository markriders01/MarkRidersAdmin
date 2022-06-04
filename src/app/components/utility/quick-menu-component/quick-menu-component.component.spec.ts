import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMenuComponentComponent } from './quick-menu-component.component';

describe('QuickMenuComponentComponent', () => {
  let component: QuickMenuComponentComponent;
  let fixture: ComponentFixture<QuickMenuComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickMenuComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
