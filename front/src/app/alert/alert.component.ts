import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements AfterViewInit {
  top = '0';
  left = '0';
  load = true;
  type:any;
  parent:any;
  @ViewChild('contentPopUp', {static : false, read : ViewContainerRef}) contentPopUp : ViewContainerRef;
  constructor(private resolver : ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.contentPopUp.clear();
    setTimeout(()=> {
      this.load = false;
      const factory = this.resolver.resolveComponentFactory(this.type);
      const component = this.contentPopUp.createComponent(factory);
      const element = <any>(component.instance);
      element.end.subscribe(res=> {
        this.parent.clear();
      })
    }, 1000)
  }

}
