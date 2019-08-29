
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as reducers from './reducers'

export interface StateApp {
    films: reducers.FilmsState;
    characters: reducers.CharacterState,
    filmCharacter: reducers.FilmCharacterState
}

export const reducersApp: ActionReducerMap<StateApp> = {
    films: reducers.filmsReducer,
    characters: reducers.characterReducer,
    filmCharacter: reducers.filmCharacterReducer
};


export const metaReducers: MetaReducer<StateApp>[] = !environment.production ? [] : [];
