import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Checkbox } from '../checkbox/checkbox.model';
import { Card } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() card!: Card;
  @Output() deleteCard: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/card/close.svg')
    );
  }

  identificate(index: number, item: Checkbox): number {
    return item.id;
  }

  public delCard() {
    this.deleteCard.emit(this.card.id);
  }
}
