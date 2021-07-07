import { Component, Input } from '@angular/core';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { classToPlain, Type } from 'class-transformer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card!: CardComponent;

  id: number = 0;
  title: string = "";
  @Type(()=>CheckboxComponent)
  tasks: CheckboxComponent[] = [];   

  identificate(index:number, item: CheckboxComponent): number {
    return item.id
  }
}