import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {
  viewMode = 'map';
  constructor() { }

  ngOnInit() {
  }

}
