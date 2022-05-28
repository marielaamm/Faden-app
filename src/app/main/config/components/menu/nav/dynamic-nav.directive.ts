import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[DynamicNav]'
})
export class DynamicNavDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
