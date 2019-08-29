import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';
import { Store } from '@ngrx/store';
import { StateApp } from '../../services/store/app.reducer';
import { LoadCharacter } from '../../services/store/actions/character.actions';
import { Router } from '@angular/router';
import { Film } from '../../models/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  @Input() film: Film;

  constructor(
    public MessageDialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
  }

  descriptionModal() {
    const MessageDialogRef = this.MessageDialog.open(DescriptionDialogComponent,
      { width: "800px", data: this.film }
    );

    MessageDialogRef.afterClosed().subscribe(result => {
    });
  }

}
