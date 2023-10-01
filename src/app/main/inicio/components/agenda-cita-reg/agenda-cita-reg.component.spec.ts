import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCitaRegComponent } from './agenda-cita-reg.component';

describe('AgendaCitaRegComponent', () => {
  let component: AgendaCitaRegComponent;
  let fixture: ComponentFixture<AgendaCitaRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaCitaRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaCitaRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
