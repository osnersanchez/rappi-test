import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDialogComponent } from './document-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MaterialModule} from "../../material/material.module";

describe('DocumentDialogComponent', () => {
  let component: DocumentDialogComponent;
  let fixture: ComponentFixture<DocumentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            MaterialModule
        ],
        providers:[
            {provide: MatDialogRef, useValue: {}},
            {provide: MAT_DIALOG_DATA, useValue: {}}
        ],
      declarations: [ DocumentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
