import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCitaComponent } from './agenda-cita.component';

describe('AgendaCitaComponent', () => {
  let component: AgendaCitaComponent;
  let fixture: ComponentFixture<AgendaCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
