import { Component, Input } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { NewtaskComponent } from '../newtask/newtask.component';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  
  @Input() todosData!: CardComponent[];

  constructor(
    private matIconRegistry:MatIconRegistry,
    private domSanitzer:DomSanitizer,
    private dialog: MatDialog,
  ){
  this.matIconRegistry.addSvgIcon(
    'plus',
    this.domSanitzer.bypassSecurityTrustResourceUrl('assets/navbar/plus.svg')
  )};
  
  openWindow() {
    this.dialog.open(NewtaskComponent, {data: this.todosData})
  }
}