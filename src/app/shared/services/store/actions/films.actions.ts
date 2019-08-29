import { Action } from '@ngrx/store'
import { Film } from 'src/app/shared/models/film';

export const LOAD_FILMS = '[Films] Load Films'
export const LOAD_FILMS_FAIL = '[Films] Load Films FAIL'
export const LOAD_FILMS_SUCCES = '[Films] Load Films SUCCESS'

export class LoadFilms implements Action {
    readonly type: string = LOAD_FILMS;
}

export class LoadFilmsFail implements Action {
    readonly type: string = LOAD_FILMS_FAIL;
    constructor(public payload: any) { }
}

export class LoadFilmsSuccess implements Action {
    readonly type: string = LOAD_FILMS_SUCCES;
    constructor(public films: Film[]) { }
}

export type FilmsActions = LoadFilms |
                            LoadFilmsFail |
                            LoadFilmsSuccess;