import { Type } from 'class-transformer';
import { Checkbox } from './checkbox.model';

export class Card {
  readonly id: number = 0;
  readonly title: string = '';
  @Type(() => Checkbox)
  tasks: Checkbox[] = [];
}
