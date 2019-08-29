import { Action } from '@ngrx/store'
import { Film } from 'src/app/shared/models/film';

export const LOAD_FILM_CHARACTER = '[FilmCharacter] Load Film Character'
export const RESET_FILM_CHARACTER = '[FilmCharacter] Reset Film Character'
export const LOAD_FILM_CHARACTER_FAIL = '[FilmCharacter] Load Film Character FAIL'
export const LOAD_FILM_CHARACTER_SUCCES = '[FilmCharacter] Load Film Character SUCCESS'

export class LoadFilmCharacter implements Action {
    readonly type: string = LOAD_FILM_CHARACTER;
    constructor(public filmCharaterRequest: string) { }
}

export class ResetFilmCharacter implements Action {
    readonly type: string = RESET_FILM_CHARACTER;
    constructor() { }
}

export class LoadFilmCharacterFail implements Action {
    readonly type: string = LOAD_FILM_CHARACTER_FAIL;
    constructor(public payload: any) { }
}

export class LoadFilmCharacterSuccess implements Action {
    readonly type: string = LOAD_FILM_CHARACTER_SUCCES;
    constructor(public filmCharacter: Film) { }
}

export type FilmCharacterActions = LoadFilmCharacter |
                            ResetFilmCharacter |
                            LoadFilmCharacterFail |
                            LoadFilmCharacterSuccess;