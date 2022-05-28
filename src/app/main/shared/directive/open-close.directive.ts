import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[OpenClose]'
})
export class OpenCloseDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
