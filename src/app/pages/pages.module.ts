import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { CharacterComponent } from './character/character.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { SearchModule } from '../shared/pipes/search/search.module';
import { MaterialModule } from '../shared/material/material.module';
import { DocumentDialogModule } from '../shared/components/document-dialog/document-dialog.module';
import { PaginationModule } from '../shared/components/pagination/pagination.module';

@NgModule({
  declarations: [
    HomeComponent,
    CharacterComponent
  ],
  imports: [
    CommonModule,
    SearchModule,
    PagesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
    MaterialModule,
    DocumentDialogModule,
    PaginationModule
  ]
})
export class PagesModule { }
