import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input()
  character: Character;
  @Output()
  onSeeMore: EventEmitter<string[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  seeFilms() {
    this.onSeeMore.emit(this.character.films)
  }

}
