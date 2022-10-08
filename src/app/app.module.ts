import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './main/config/components/login/login.component';

//I keep the new line
import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AutofocusDirective } from './main/shared/directive/autofocus.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogoComponent } from './main/shared/components/dialogo/dialogo.component';

//I keep the new line
//JAIR
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './main/config/components/menu/menu.component';
import { DropDownDirective } from './main/shared/directive/drop-down.directive';
import { NavComponent } from './main/config/components/menu/nav/nav.component';
import { OpenCloseDirective } from './main/shared/directive/open-close.directive';
import { DynamicNavDirective } from './main/config/components/menu/nav/dynamic-nav.directive';
import { UsuarioComponent } from './main/config/components/usuario/usuario.component';
import { DynamicFormDirective } from './main/shared/directive/dynamic-form.directive';
import { IgxComboModule } from 'igniteui-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModalModule } from 'ng-modal-lib';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { RolesComponent } from './main/config/components/roles/roles.component';
import { RolesRegistroComponent } from './main/config/components/roles/roles-registro/roles-registro.component';
import { ProformaComponent } from './main/fac/components/proforma/proforma.component';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DepartamentoComponent } from './main/cat/components/departamento/departamento.component';
import { MunicipioComponent } from './main/cat/components/municipio/municipio.component';
import { MunicipioRegistroComponent } from './main/cat/components/municipio/municipio-registro/municipio-registro.component';
import { DepartamentoRegistroComponent } from './main/cat/components/departamento/departamento-registro/departamento-registro/departamento-registro.component';
import { EscolaridadComponent } from './main/cat/components/escolaridad/escolaridad.component';
import { EscolaridadRegistroComponent } from './main/cat/components/escolaridad/escolaridad-registro/escolaridad-registro.component';
import { PacienteComponent } from './main/inicio/components/expediente/paciente/paciente.component';
import { HistoriamedicaComponent } from './main/inicio/components/expediente/historiamedica/historiamedica.component';
import { SoapComponent } from './main/inicio/components/soap/soap.component';
import { TratamientoActualComponent } from './main/inicio/components/expediente/historiamedica/tratamiento-actual/tratamiento-actual.component';
import { ExamenClinicoComponent } from './main/inicio/components/expediente/historiamedica/examen-clinico/examen-clinico.component';
import { AntecedentesFamiliaresComponent } from './main/inicio/components/expediente/historiamedica/antecedentes-familiares/antecedentes-familiares.component';
import { AntecedentePatologicoComponent } from './main/inicio/components/expediente/historiamedica/antecedente-patologico/antecedente-patologico.component';
import { AntecedenteNeuropsiquiatricoComponent } from './main/inicio/components/expediente/historiamedica/antecedente-neuropsiquiatrico/antecedente-neuropsiquiatrico.component';
import { ConsensomedicoComponent } from './main/inicio/components/consensomedico/consensomedico.component';
import { ExpedienteComponent } from './main/inicio/components/expediente/expediente.component';
import { AntecedenteQuirurgicoComponent } from './main/inicio/components/historiamedica/antecedente-quirurgico/antecedente-quirurgico.component';
import { SindromepredominanteComponent } from './main/inicio/components/consensomedico/sindromepredominante/sindromepredominante.component';
import { AcompananteComponent } from './main/inicio/components/expediente/paciente/acompanante/acompanante.component';
import { MedicosComponent } from './main/cat/components/medicos/medicos.component';
import { RegistrosMedicosComponent } from './main/cat/components/medicos/registros-medicos/registros-medicos.component';

//FIN

export const DateFormat = {
  parse: {
    dateInput: 'input',
    },
    display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    }
  };



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AutofocusDirective,
    DialogoComponent,
    MenuComponent,
    DropDownDirective,
    NavComponent,
    OpenCloseDirective,
    DynamicNavDirective,
    UsuarioComponent,
    DynamicFormDirective,
    RolesComponent,
    RolesRegistroComponent,
    ProformaComponent,
    DepartamentoComponent,
    MunicipioComponent,
    MunicipioRegistroComponent,
    DepartamentoRegistroComponent,
    EscolaridadComponent,
    EscolaridadRegistroComponent,
    PacienteComponent,
    HistoriamedicaComponent,
    SoapComponent,
    TratamientoActualComponent,
    ExamenClinicoComponent,
    AntecedentesFamiliaresComponent,
    AntecedentePatologicoComponent,
    AntecedenteNeuropsiquiatricoComponent,
    ConsensomedicoComponent,
    ExpedienteComponent,
    AntecedenteQuirurgicoComponent,
    SindromepredominanteComponent,
    AcompananteComponent,
    MedicosComponent,
    RegistrosMedicosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgbModule,

    //I keep the new line
    ReactiveFormsModule,
    HttpClientModule,
    IgxComboModule,
    ModalModule

  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(faUser);
  }
}
