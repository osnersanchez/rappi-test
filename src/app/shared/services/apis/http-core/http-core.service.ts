import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpCoreApiService {

    constructor(private http: HttpClient) { }

    get(endpoint: string): Observable<Object> {
        return this.http.get(`${endpoint}`);
    }
}