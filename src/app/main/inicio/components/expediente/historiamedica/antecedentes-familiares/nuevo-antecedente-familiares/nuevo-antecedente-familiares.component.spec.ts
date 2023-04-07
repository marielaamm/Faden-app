import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAntecedenteFamiliaresComponent } from './nuevo-antecedente-familiares.component';

describe('NuevoAntecedenteFamiliaresComponent', () => {
  let component: NuevoAntecedenteFamiliaresComponent;
  let fixture: ComponentFixture<NuevoAntecedenteFamiliaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAntecedenteFamiliaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAntecedenteFamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
