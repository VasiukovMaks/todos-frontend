import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Checkbox } from '../checkbox/checkbox.model';
import { Card } from './card.model';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() card!: Card;

  constructor(
    private cardService: CardService,
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

  deleteCard() {
    this.cardService.delete_category(this.card.id).subscribe(() => {});
  }
}
