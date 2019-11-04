import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-music-progress',
  templateUrl: './music-progress.component.html',
  styleUrls: ['./music-progress.component.css']
})
export class MusicProgressComponent implements OnInit {
  @Input() position;
  getPosition = false;
  tmpPosition
  @Output("changePosition") emitPosition = new EventEmitter<any>();
  @ViewChild('progress', {static : false, read:ElementRef}) progressElement : ElementRef
  constructor() { }

  ngOnInit() {
  }

  changePosition = (e) => {
    this.emitPosition.emit((e.pageX-15)/this.progressElement.nativeElement.offsetWidth);
  }



  

}
