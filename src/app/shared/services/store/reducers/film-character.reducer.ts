import { FilmCharacterActions, LOAD_FILM_CHARACTER, RESET_FILM_CHARACTER, LOAD_FILM_CHARACTER_FAIL, LOAD_FILM_CHARACTER_SUCCES } from "../actions";
import { Film } from "src/app/shared/models/film";

export interface FilmCharacterState {
    filmCharacter: Film;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: FilmCharacterState = {
    filmCharacter: null,
    loaded: false,
    loading: false,
    error: null
}

export function filmCharacterReducer(state = initState, action: FilmCharacterActions): FilmCharacterState {
    switch (action.type) {
        case LOAD_FILM_CHARACTER:

            return {
                ...state,
                filmCharacter: null,
                loading: true,
                error: null
            };

        case RESET_FILM_CHARACTER:

            return {
                ...state,
                loading: false,
                loaded: false,
                error: null,
                filmCharacter: null

            };
        case LOAD_FILM_CHARACTER_FAIL:

            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    ...(<any>action).payload
                }
            };
        case LOAD_FILM_CHARACTER_SUCCES:

            return {
                ...state,
                loading: false,
                loaded: true,
                filmCharacter: { ...(<any>action).filmCharacter }
            };

        default:
            return state;
    }
}