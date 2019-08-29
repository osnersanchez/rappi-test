import { Component, Input, OnChanges, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})


export class LoadingComponent implements OnChanges{
 @Input() loading: boolean = false; 
 public _loading: boolean = true; 
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnChanges(changes): void {
    if (changes.loading) {
      this.document.body.style.overflow = 'hidden';
      this.document.body.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      
      if(!this.loading){
        setTimeout(() => {
         this.document.body.style.overflow = this.loading ? 'hidden' : 'auto';
         this._loading = this.loading;
        }, 2000);
      }else{
        this._loading = this.loading;
        this.document.body.style.overflow = this.loading ? 'hidden' : 'auto';
      }
    }
  }

}