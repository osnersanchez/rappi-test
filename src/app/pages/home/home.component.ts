import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateApp } from 'src/app/shared/services/store/app.reducer';
import { LoadFilms, LoadCharacter } from 'src/app/shared/services/store/actions';
import { Film } from 'src/app/shared/models/film';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public films: Film[] = [];
	public loading: boolean = false;

	constructor(
		private store: Store<StateApp>
	) { }

	ngOnInit() {
		this.store.dispatch(new LoadFilms())
		this.store.select('films').subscribe((res) => {
			this.loading = res.loading;
			this.films = res.films;
		})
	}

}
