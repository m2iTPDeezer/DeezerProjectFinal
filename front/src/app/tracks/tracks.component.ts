import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  @Input() tracks;
  constructor() { }

  ngOnInit() {
  }

}
