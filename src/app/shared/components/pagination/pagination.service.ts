import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { Environments } from '../../constansts/environments.constanst';
import { HttpClient } from '@angular/common/http';

const MAX_ROW_DEFAULT = 10;
@Injectable()
export class PaginationService {

    private controlPagination: PaginationModel = {
        Skip: 0,
        Top: MAX_ROW_DEFAULT,
        FilterVal: ''
    };

    private url: string;
    private internalList: any[];

    private _dataPaginator: BehaviorSubject<PaginateDate> = new BehaviorSubject(new PaginateDate());

    constructor(private http: HttpClient) {
    }

    setInterUrl(url: string) {
        this._dataPaginator.next(new PaginateDate({ ...this._dataPaginator.getValue(), ...{ listCurrency: [] } }))
        this.internalList = null;
        this.url = url;
    }

    setIternalList(array: any[]) {
        this._dataPaginator.next(new PaginateDate({
            listCurrency: [], 
            numberPages: Math.ceil(array.length / this.controlPagination.Top)
        }))
        this.url = null;
        this.internalList = array;
        this.nextInternalList();
    }

    resetList() {
        this.controlPagination.Skip = 0;
        this.controlPagination.Top = MAX_ROW_DEFAULT;
        let numberPages = this.internalList ? Math.ceil(this.internalList.length / this.controlPagination.Top) : 0;
        this._dataPaginator.next(new PaginateDate({ numberPages }))
        this.infinityLazyPaginate();
        this.nextInternalList();
    }

    seeMore() {
        if (!this.internalList) {
            this._dataPaginator.next(new PaginateDate({ ...this._dataPaginator.getValue(), ...{ allData: false } }))
            this.infinityLazyPaginate();
        }
    }

    changeFilter(filterVal: string) {
        if (!this.internalList) {
            this.controlPagination.FilterVal = filterVal;
            this.resetList();
        }
    }

    getDataPaginator() {
        return this._dataPaginator.asObservable();
    }

    infinityLazyPaginate() {
        if (this.url && !this._dataPaginator.getValue().loadData) {
            let allData = false;
            let listCurrency = [];
            let observer = this.http.post(this.url, this.controlPagination);

            if (!this._dataPaginator.getValue().allData) {
                this._dataPaginator.next(new PaginateDate({ ...this._dataPaginator.getValue(), loadData: true }))
                observer.subscribe((newArray: any[]) => {
                    if (newArray.length < this.controlPagination.Top) {
                        allData = !allData
                    } else {
                        this.controlPagination.Skip += this.controlPagination.Top;
                    }

                    if (newArray.length > (this._dataPaginator.getValue().listCurrency.length % this.controlPagination.Top)) {

                        listCurrency = [
                            ...this._dataPaginator.getValue().listCurrency,
                            ...newArray.slice((this._dataPaginator.getValue().listCurrency.length % this.controlPagination.Top) % this.controlPagination.Top)
                        ]

                    }

                    this._dataPaginator.next(new PaginateDate({ ...this._dataPaginator.getValue(), loadData: false, listCurrency, allData }))
                }, error => {
                    this._dataPaginator.next(new PaginateDate({ ...this._dataPaginator.getValue(), loadData: false }))
                });
            }
        }
    }


    moveInternalList(pageNumber: number) {
        if (this.internalList &&
            (pageNumber &&
                (pageNumber <= this._dataPaginator.getValue().numberPages &&
                    pageNumber >= 1)
            )
        ) {
            this.controlPagination.Skip = (pageNumber * this.controlPagination.Top) - this.controlPagination.Top;
            let newArray = this.internalList.slice(this.controlPagination.Skip, pageNumber * this.controlPagination.Top);
            let newAllData = false;
            if (newArray.length < this.controlPagination.Top) {
                newAllData = !newAllData;
            }

            this._dataPaginator.next(new PaginateDate({
                ...this._dataPaginator.getValue(),
                currentPage: pageNumber,
                listCurrency: newArray,
                allData: newAllData
            }))
        }

    }

    moveToInternalList(pageNumber: number) {
        this.moveInternalList(pageNumber)
    }


    nextInternalList() {
        this.moveInternalList(this._dataPaginator.getValue().currentPage + 1)
    }

    backInternalList() {
        this.moveInternalList(this._dataPaginator.getValue().currentPage - 1)
    }

}

class PaginationModel {
    public Skip: number = 0;
    public Top: number = MAX_ROW_DEFAULT;
    public FilterVal: string = '';
}

export class PaginateDate {
    public listCurrency: any[] = new Array<any>();
    public loadData: boolean = false;
    public allData: boolean = false;
    public currentPage: number = 0;
    public numberPages: number = 0;

    constructor(paginateDate?: Partial<PaginateDate>) {
        if (paginateDate) {
            this.listCurrency = paginateDate.listCurrency ? paginateDate.listCurrency : this.listCurrency;
            this.loadData = paginateDate.loadData ? paginateDate.loadData : this.loadData;
            this.allData = paginateDate.allData ? paginateDate.allData : this.allData;
            this.currentPage = paginateDate.currentPage ? paginateDate.currentPage : this.currentPage;
            this.numberPages = paginateDate.numberPages ? paginateDate.numberPages : this.numberPages;
        }
    }
}