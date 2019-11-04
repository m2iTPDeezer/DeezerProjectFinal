import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-list25',
  templateUrl: './list25.component.html',
  styleUrls: ['./list25.component.css']
})
export class List25Component implements OnInit {

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  tracks:any;
  get25 = () => {this.api.list25('api/track').subscribe((res:any) => {this.tracks = res})};
}
