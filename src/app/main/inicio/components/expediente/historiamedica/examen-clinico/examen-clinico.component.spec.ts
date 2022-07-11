import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenClinicoComponent } from './examen-clinico.component';

describe('ExamenClinicoComponent', () => {
  let component: ExamenClinicoComponent;
  let fixture: ComponentFixture<ExamenClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenClinicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
