import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OMDbAPIResponseInterface } from '../shared/types/omdb-api-response-interface';
import { MovieInterface } from '../shared/types/movie-interface';

const url = 'https://www.omdbapi.com/?apikey=5e826b4b';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  constructor(private http: HttpClient) {}

  getData(): Observable<OMDbAPIResponseInterface | undefined> {
    return this.http.get<OMDbAPIResponseInterface | undefined>(
      `${url}&s=$game`
    );
  }

  searchMovie(
    title: string,
    year: string
  ): Observable<OMDbAPIResponseInterface | undefined> {
    return this.http.get<OMDbAPIResponseInterface | undefined>(
      `${url}&s=${title}&y=${year}`
    );
  }
}
