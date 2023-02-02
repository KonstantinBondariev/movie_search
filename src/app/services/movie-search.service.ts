import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { OMDbAPIResponseInterface } from '../shared/types/omdb-api-response-interface';
import { MovieInterface } from '../shared/types/movie-interface';
import { MovieFullDataInterface } from '../shared/types/movie-full-data-interface';

const url = 'https://www.omdbapi.com/?apikey=5e826b4b';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  constructor(private http: HttpClient) {}

  getfullData(imdbID: string): Observable<MovieFullDataInterface | undefined> {
    return this.http.get<MovieFullDataInterface | undefined>(
      `http://www.omdbapi.com/?apikey=5e826b4b&i=${imdbID}`
    );
  }

  getData(): Observable<OMDbAPIResponseInterface | undefined> {
    return this.http.get<OMDbAPIResponseInterface | undefined>(
      `http://www.omdbapi.com/?apikey=5e826b4b&i=tt2084970`
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
