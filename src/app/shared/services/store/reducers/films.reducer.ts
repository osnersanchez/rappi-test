import { FilmsActions, LOAD_FILMS, LOAD_FILMS_SUCCES, LOAD_FILMS_FAIL } from "../actions";
import { Film } from "src/app/shared/models/film";

export interface FilmsState {
    films: Film[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: FilmsState = {
    films: [],
    loaded: false,
    loading: false,
    error: null
}

export function filmsReducer(state = initState, action: FilmsActions): FilmsState {
    switch (action.type) {
        case LOAD_FILMS:

            return {
                ...state,
                loading: true,
                error: null
            };
        case LOAD_FILMS_FAIL:

            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: (<any>action).payload.status,
                    message: (<any>action).payload.message,
                    url: (<any>action).payload.url
                }
            };
        case LOAD_FILMS_SUCCES:

            return {
                ...state,
                loading: false,
                loaded: true,
                films: [...(<any>action).films]
            };

        default:
            return state;
    }
}