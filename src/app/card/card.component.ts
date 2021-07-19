import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Card, Checkbox } from '../custom-classes/app.custom.classes';
import { AppHttp } from '../service/app.http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card!: Card; 

  constructor ( private httpService: AppHttp,
                private matIconRegistry:MatIconRegistry,
                private domSanitzer:DomSanitizer,){
                  this.matIconRegistry.addSvgIcon(
                    'close',
                    this.domSanitzer.bypassSecurityTrustResourceUrl('assets/card/close.svg')
                  )
                }

  identificate(index:number, item: Checkbox): number {
    return item.id
  }

  deleteCard () {
    this.httpService.delete_category(this.card.id).subscribe(()=>{
      
    })
  }
}

