import { Action } from '@ngrx/store'
import { Character } from 'src/app/shared/models/character';

export const LOAD_CHARACTER = '[Character] Load Character'
export const RESET_CHARACTER = '[Character] Reset Character'
export const LOAD_CHARACTER_FAIL = '[Character] Load Character FAIL'
export const LOAD_CHARACTER_SUCCES = '[Character] Load Character SUCCESS'

export class LoadCharacter implements Action {
    readonly type: string = LOAD_CHARACTER;
    constructor(public idFilm: number) { }
}

export class ResetCharacter implements Action {
    readonly type: string = RESET_CHARACTER;
    constructor() { }
}

export class LoadCharacterFail implements Action {
    readonly type: string = LOAD_CHARACTER_FAIL;
    constructor(public payload: any) { }
}

export class LoadCharacterSuccess implements Action {
    readonly type: string = LOAD_CHARACTER_SUCCES;
    constructor(public characters: Character[]) { }
}

export type CharactersActions = LoadCharacter |
                            ResetCharacter |
                            LoadCharacterFail |
                            LoadCharacterSuccess;