import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as actions from '../actions'
import { LoadFilmsSuccess, LoadFilmsFail } from "../actions";
import { StarWarsApiService } from "../../apis/star-wars/star-wars-api.service";
import { FILMS_IMG } from "../../mocks/films-img.mock";
import { Film } from "src/app/shared/models/film";

@Injectable()
export class FilmsEffects {

    constructor(
        private actions$: Actions,
        private startWarsSerive: StarWarsApiService
    ) { }

    @Effect()
    private loadFilms$ = this.actions$
        .pipe(
            ofType(actions.LOAD_FILMS),
            switchMap(() => this.startWarsSerive.getFilms()
                .pipe(
                    map((data: any) => {

                        let array: Film[] = data.results
                            .sort((a, b) => a.episode_id - b.episode_id)
                            .map((data: Film) =>
                                new Film({ ...data, ...FILMS_IMG.find(img => img.episode_id == data.episode_id) })
                            );

                        return new LoadFilmsSuccess(array)
                    }),
                    catchError(error => of(new LoadFilmsFail(error)))
                )
            )
        )

}