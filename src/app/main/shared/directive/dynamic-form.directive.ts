import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[DynamicForm]'
})
export class DynamicFormDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
