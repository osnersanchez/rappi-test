import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateApp } from 'src/app/shared/services/store/app.reducer';
import { Store } from '@ngrx/store';
import { ResetCharacter, LoadCharacter, LoadFilms } from 'src/app/shared/services/store/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DocumentDialogComponent } from 'src/app/shared/components/document-dialog/document-dialog.component';
import { Character } from 'src/app/shared/models/character';
import { Film } from 'src/app/shared/models/film';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  public characters: Character[] = [];
  public charactersPage: Character[] = [];
  public loading: boolean = false;
  public idFilm: number;
  public film: Film = null;
  public films: Film[] = [];
  public subs: Subscription = new Subscription();

  public searchVal: string = '';
  public properties: string[] = ['eye_color', 'gender', 'name'];

  constructor(
    private store: Store<StateApp>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public MessageDialog: MatDialog
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(param => {
      this.idFilm = Number.parseInt(param.id)
      this.subs.unsubscribe();
      this.subs = new Subscription();
      if (this.idFilm) {
        this.store.dispatch(new LoadCharacter(this.idFilm));
      }

      this.subs.add(this.store.select('films').subscribe(res => {
        this.films = res.films;
        this.film = res.films.find(data => data.episode_id == this.idFilm)
      }));

      this.subs.add(this.store.select('characters').subscribe((res) => {
        this.loading = res.loading;
        this.characters = res.characters;
      }))
    })

  }

  moveFilm(to: number) {
    let idFilm = this.idFilm - 1
    if (idFilm + to >= 0 && idFilm + to <= this.films.length - 1) {
      let film = this.films[idFilm + to]
      this.router.navigate(['/character/' + film.episode_id])
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.store.dispatch(new ResetCharacter())
  }

  seeMore(films: string[]) {
    const MessageDialogRef = this.MessageDialog
      .open(
        DocumentDialogComponent,
        {
          width: "800px",
          data: films
        }
      );

    MessageDialogRef.afterClosed().subscribe(result => {
    });
  }


}
