import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search
  constructor(private searchService : SearchService) { }

  ngOnInit() {
  }

  change = ()=> {
    this.searchService.searchSubject.next(this.search);
  }

}
