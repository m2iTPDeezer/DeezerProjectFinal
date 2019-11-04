import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  tracks = [];
  constructor(private api:ApiService, private searchService : SearchService) { }

  ngOnInit() {
    this.api.getApi('tracks').subscribe((res:any)=> {
      this.tracks = res;
      console.log(this.tracks);
    })
    this.searchService.searchSubject.subscribe(s=> {
      this.api.postApi('tracks', {search : s}).subscribe((res:any)=> {
        this.tracks = res;
      })
    })
  }

}
