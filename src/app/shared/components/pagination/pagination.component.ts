import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PaginationService, PaginateDate } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [PaginationService]
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  public data: any[];
  @Output()
  public onPaginate: EventEmitter<any[]> = new EventEmitter<any[]>();

  public paginateDate: PaginateDate = new PaginateDate();

  constructor(
    private paginationService: PaginationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginationService.setIternalList(changes.data.currentValue);
  }

  ngOnInit() {
    this.paginationService.getDataPaginator()
      .subscribe((data: PaginateDate) => {
        setTimeout(_ =>
          this.onPaginate.emit(data.listCurrency)
          , 1)
          this.paginateDate = data;
      })
  }

  next() {
    this.paginationService.nextInternalList();
  }

  back() {
    this.paginationService.backInternalList();
  }

  moveTo(pageNumber: number) {
    this.paginationService.moveInternalList(pageNumber);
  }

}
