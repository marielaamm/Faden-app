import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAntecedenteQuirurgicoComponent } from './nuevo-antecedente-quirurgico.component';

describe('NuevoAntecedenteQuirurgicoComponent', () => {
  let component: NuevoAntecedenteQuirurgicoComponent;
  let fixture: ComponentFixture<NuevoAntecedenteQuirurgicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAntecedenteQuirurgicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAntecedenteQuirurgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
