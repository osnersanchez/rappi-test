import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as actions from '../actions'
import { HttpCoreApiService } from "../../apis/http-core/http-core.service";
import { LoadFilmCharacterSuccess, LoadFilmCharacterFail } from "../actions";
import { FILMS_IMG } from "../../mocks/films-img.mock";
import { Film } from "src/app/shared/models/film";

@Injectable()
export class FilmCharacterEffects {

    constructor(
        private actions$: Actions,
        private coreSerive: HttpCoreApiService
    ) { }

    @Effect()
    private loadFilmCharacters$ = this.actions$
        .pipe(
            ofType(actions.LOAD_FILM_CHARACTER),
            switchMap((action: any) => {
                return this.coreSerive.get(action.filmCharaterRequest)
                    .pipe(
                        map((data: Film) => {
                            data = new Film({ ...data, ...FILMS_IMG.find(img => img.episode_id == data.episode_id) })
                            return new LoadFilmCharacterSuccess(data)
                        }),
                        catchError(error => of(new LoadFilmCharacterFail(error)))
                    )
            })
        )

}