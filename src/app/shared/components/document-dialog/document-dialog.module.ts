import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { DocumentDialogComponent } from './document-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    DocumentDialogComponent
],
exports:[
    DocumentDialogComponent
  ],
  entryComponents:[
    DocumentDialogComponent
  ]
})
export class DocumentDialogModule { }
