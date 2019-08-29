import { Component, Inject, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { BehaviorSubject } from 'rxjs';
import { StateApp } from '../../services/store/app.reducer';
import { Store } from '@ngrx/store';
import { LoadFilmCharacter } from '../../services/store/actions';
import { Film } from '../../models/film';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent implements OnInit, AfterViewInit {

  public docs: string[] = [];
  public docView = null;
  public docIndex = 0;

  constructor(public DocumentDialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private store: Store<StateApp>
  ) { }

  ngOnInit() {
    if (this.data && this.data.length) {
      this.docs = this.data;
      
      this.store.dispatch(new LoadFilmCharacter(this.docs[this.docIndex]));
    }

    this.store.select('filmCharacter').subscribe(filmCharacter => {
      this.chargeAttached(filmCharacter.filmCharacter);
    })
  }

  ngAfterViewInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    event.keyCode === 39 && this.nextDoc();
    event.keyCode === 37 && this.prevDoc();
  }

  nextDoc() {
    if (this.docs.length > this.docIndex + 1) {
      this.docIndex++;
      this.store.dispatch(new LoadFilmCharacter(this.docs[this.docIndex]));
    }
  }

  prevDoc() {
    if (this.docIndex - 1 > -1) {
      this.docIndex--;
      this.store.dispatch(new LoadFilmCharacter(this.docs[this.docIndex]));
    }
  }

  chargeAttached(file: Film) {
    // file.episode_id
    // file.title
    // file.imgUrl
    this.docView = file;
    if (file && file.imgUrl !== undefined) {
      this.docView = file;
      if (file.imgUrl.includes('pdf')) {
        document.getElementById(`frame-attached-preview`).setAttribute('src', `https://docs.google.com/viewer?url=${file.imgUrl}&embedded=true`);
      } else {
        document.getElementById(`img-attached-preview`).setAttribute('src', file.imgUrl);
      }
    }
  }

  onNoClick(): void {
    this.DocumentDialogRef.close();
  }

  confirm(): void {
    this.DocumentDialogRef.close();
  }
}
