import { Directive,ElementRef,HostBinding,HostListener} from '@angular/core';


@Directive({
  selector: '[appDropDown]',
exportAs:'appDropDown'
})
export class DropDownDirective {

  @HostBinding('class.open') isOpen: boolean | undefined;

  constructor(private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  //@HostListener('document:touchstart', ['$event'])
  toggle(event : any) {
    if (this.elemRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
  }

  }
}