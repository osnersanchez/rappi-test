import { CharactersActions, LOAD_CHARACTER, LOAD_CHARACTER_SUCCES, LOAD_CHARACTER_FAIL, RESET_CHARACTER } from "../actions";
import { Character } from "src/app/shared/models/character";

export interface CharacterState {
    characters: Character[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: CharacterState = {
    characters: [],
    loaded: false,
    loading: false,
    error: null
}

export function characterReducer(state = initState, action: CharactersActions): CharacterState {
    switch (action.type) {
        case LOAD_CHARACTER:

            return {
                ...state,
                loading: true,
                error: null
            };

        case RESET_CHARACTER:

            return {
                ...state,
                loading: false,
                loaded: false,
                error: null,
                characters: []

            };
        case LOAD_CHARACTER_FAIL:

            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    ...(<any>action).payload
                }
            };
        case LOAD_CHARACTER_SUCCES:

            return {
                ...state,
                loading: false,
                loaded: true,
                characters: [...(<any>action).characters]
            };

        default:
            return state;
    }
}