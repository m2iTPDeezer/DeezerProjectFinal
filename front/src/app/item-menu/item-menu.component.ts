import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent implements OnInit {
  @Input() icon;
  @Input() title;
  @Input() link;
  constructor() { }

  ngOnInit() {
  }

}
