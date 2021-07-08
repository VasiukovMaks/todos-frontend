import { Type } from 'class-transformer';

export class Card {
  
    readonly id: number = 0;
    readonly title: string = "";
    @Type(()=>Checkbox)
    tasks: Checkbox[] = [];   
  }

export class Checkbox {
  
    readonly id: number = 0;
    readonly text: string = "";
    is_completed: boolean = false;
    readonly category_id: number = 0;
  }