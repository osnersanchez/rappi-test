import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './film-card/film-card.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { DescriptionDialogComponent } from './description-dialog/description-dialog.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    FilmCardComponent,
    CharacterCardComponent,
    DescriptionDialogComponent,
    LoadingComponent
  ],
  exports:[
    FilmCardComponent,
    CharacterCardComponent,
    DescriptionDialogComponent,
    LoadingComponent
  ],
  entryComponents:[
    DescriptionDialogComponent
  ]
})
export class ComponentsModule { }
