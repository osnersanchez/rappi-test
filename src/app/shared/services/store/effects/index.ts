import { FilmsEffects } from './films.effect';
import { CharacterEffects } from './character.effect';
import { FilmCharacterEffects } from './film-character.effect';


export const effectsArr: any[] = [FilmsEffects, CharacterEffects, FilmCharacterEffects];

export * from './film-character.effect'
export * from './character.effect'
export * from './films.effect'