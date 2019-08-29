import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  constructor(private http: HttpClient) { }

  getFilms() {
    return this.http.get(`${environment.apiUrl}/films`);
  }

  getPeople(id){ 
    return this.http.get(`${environment.apiUrl}/people/${id}/`);
  }
  
  getPlanet(id){
    return this.http.get(`${environment.apiUrl}/planets/${id}/`);    
  }

  getStarships(id){
    return this.http.get(`${environment.apiUrl}/starships/${id}/`);    
  }
}