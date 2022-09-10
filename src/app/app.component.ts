import { Component, HostListener, Input, OnInit } from '@angular/core';
import { LoginService } from './main/config/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Escalante Sanchez S.A.';

  constructor(private _loginserv : LoginService){
    
    _loginserv.VerificarSession();

  }

  

  ngOnInit(): void {
    window.addEventListener('beforeunload', function (e) {
      var confirmationMessage = 'o/';
      e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    });


  }



  @Input() public href: string | undefined;
  @HostListener('click', ['$event']) public onClick(event: Event): void {

    if (
      !this.href ||
      this.href == '#' ||
      (this.href && this.href.length === 0)
    ) {
      var element = <HTMLElement>event.target;


      if (element.tagName.toString().toLocaleLowerCase() != "a") {
        return;
      }

      event.preventDefault();
    }
  }
}
