import { Component, Input } from '@angular/core';

import { Card, Checkbox } from '../custom-classes/app.custom.classes';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card!: Card; 

  identificate(index:number, item: Checkbox): number {
    return item.id
  }
}