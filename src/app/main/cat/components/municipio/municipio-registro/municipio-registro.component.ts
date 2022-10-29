import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmarComponent } from 'src/app/main/shared/components/dialogo-confirmar/dialogo-confirmar.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iMunicipio } from '../../../interface/i-municipio';
import { CatalogoService } from '../../../service/catalogo.service';
import { MunicipioComponent } from '../municipio.component';


let ELEMENT_DATA: iMunicipio[] =[];

@Component({
  selector: 'app-municipio-registro',
  templateUrl: './municipio-registro.component.html',
  styleUrls: ['./municipio-registro.component.scss']
})
export class MunicipioRegistroComponent implements OnInit {

  displayedColumns: string[] = ['IdCiudad','Nombre','CoDepto','Departamento', 'Accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iMunicipio>();
  private _liveAnnouncer:any;
  private _CatalogoService: CatalogoService;
  private  dialogRef : MatDialogRef<MunicipioComponent>;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this._CatalogoService = new CatalogoService(this._Dialog);
    this._CatalogoService.BuscarMunicipio(); 
   }


  announceSort(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  
  private LlenarMunicipio(datos: string): void {

    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    _json["d"].forEach(
      (b: any) => {
        ELEMENT_DATA.push(b);
      }
    );

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  }

  public EditarCiudad(fila: any){
   

    this.dialogRef =this._Dialog.open(MunicipioComponent, { disableClose: true })


    this.dialogRef.afterOpened().subscribe(s => {
      this.dialogRef.componentInstance.EditarCiudad(fila);
    })
    
  }
  
  private CerrarModalMunicipio(){
    this.dialogRef.close();
    this._CatalogoService.BuscarMunicipio();



  } 

  public EliminarCiudad(fila: any){

    let dialogo : MatDialogRef<DialogoConfirmarComponent> = this._Dialog.open(DialogoConfirmarComponent, { disableClose: true })

    dialogo.componentInstance.titulo = "Eliminar Registro";
    dialogo.componentInstance.mensaje = "Eliminar";
    dialogo.componentInstance.texto = fila.IdCiudad + " " + fila.Nombre;

    dialogo.afterClosed().subscribe(s=>{

      if(dialogo.componentInstance.retorno=="1"){
       this._CatalogoService.EliminarCiudad(fila.Codigo);

      }
      
    });


  }

    
  ngOnInit(): void {

    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmMunicipio") {
          this.CerrarModalMunicipio();
        }


      }
    });

    
    this._CatalogoService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_municipio") {
          this.LlenarMunicipio(s[1]);
        }

        //if (s[0] == "dato_Departamento_Eliminar") {
          //this._CatalogoService.GuardarDepartamento(Departamento);
        //}

      }
    });
  }

}
