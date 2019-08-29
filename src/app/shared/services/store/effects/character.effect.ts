import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, take, withLatestFrom, merge, first } from "rxjs/operators";
import { of, Observable, forkJoin } from "rxjs";

import * as actions from '../actions'
import { LoadCharacterSuccess, LoadCharacterFail, LoadFilms } from "../actions";
import { HttpCoreApiService } from "../../apis/http-core/http-core.service";
import { Store } from "@ngrx/store";
import { StateApp } from "../app.reducer";
import { Character } from "src/app/shared/models/character";
import { Film } from "src/app/shared/models/film";

@Injectable()
export class CharacterEffects {

  constructor(
    private actions$: Actions,
    private coreSerive: HttpCoreApiService,
    private store: Store<StateApp>
  ) { }

  @Effect()
  private loadCharacters$ = this.actions$
    .pipe(
      ofType(actions.LOAD_CHARACTER),
      map(action => action),
      withLatestFrom(this.store.select(state => state.films)),
      switchMap(([actionCharacter, storeFilms]) => {

        const callLoadCharacter = (array: string[]) => {
          let arrayRequest: Observable<any>[] = new Array<Observable<any>>();
          array.forEach((character: string) => {
            arrayRequest.push(this.coreSerive.get(character))
          });
          return forkJoin(...arrayRequest)
            .pipe(
              map((data: any[]) => {
                return new LoadCharacterSuccess(data.map(character => new Character(character)))
              }),
              catchError(error => of(new LoadCharacterFail(error)))
            )
        }

        if (storeFilms.loaded) {
          let film: Film = new Film(storeFilms.films.find(data => data.episode_id == (<any>actionCharacter).idFilm))
          if (film.episode_id) {
            return callLoadCharacter(film.characters);
          } else {
            return of(new LoadCharacterFail({ message: "Does not exist" }))
          }
        } else {
          return of(new LoadFilms())
            .pipe(
              merge(
                this.actions$
                  .pipe(
                    ofType(actions.LOAD_FILMS_SUCCES, actions.LOAD_FILMS_FAIL),
                    first(),
                    switchMap((action: any) => {
                      if (action.type === actions.LOAD_FILMS_FAIL) {
                        return of(new LoadCharacterFail({ message: "I fail to load the films" }));
                      }
                      let film: Film = new Film(action.films.find(data => data.episode_id == (<any>actionCharacter).idFilm))
                      if (film.episode_id) {
                        return callLoadCharacter(film.characters);
                      } else {
                        return of(new LoadCharacterFail({ message: "Does not exist" }))
                      }
                    })
                  )
              )
            )
        }

      })
    )

}