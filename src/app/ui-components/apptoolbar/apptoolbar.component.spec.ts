import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptoolbarComponent } from './apptoolbar.component';

describe('ApptoolbarComponent', () => {
  let component: ApptoolbarComponent;
  let fixture: ComponentFixture<ApptoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApptoolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApptoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
