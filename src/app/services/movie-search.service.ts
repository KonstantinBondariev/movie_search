import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OMDbAPIResponseInterface } from '../shared/types/omdb-api-response-interface';
import { MovieInterface } from '../shared/types/movie-interface';
import { MovieFullDataInterface } from '../shared/types/movie-full-data-interface';

const url = 'https://www.omdbapi.com/?apikey=5e826b4b';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  currentID: string | null = null;
  currentTitle: string | null = null;
  currentYear: string = '';
  totalResult: string | null | undefined = null;
  curreantPage: number = 1;
  currentMovies!: MovieInterface[] | undefined;

  constructor(private http: HttpClient) {}

  getfullData(imdbID: string): Observable<MovieFullDataInterface | undefined> {
    return this.http.get<MovieFullDataInterface | undefined>(
      `https://www.omdbapi.com/?apikey=5e826b4b&i=${imdbID}`
    );
  }

  getData(): Observable<OMDbAPIResponseInterface | undefined> {
    return this.http.get<OMDbAPIResponseInterface | undefined>(
      `https://www.omdbapi.com/?apikey=5e826b4b&i=tt2084970`
    );
  }

  searchMovie(
    title: string,
    year: string,
    page: any = this.curreantPage,
    type: string = ''
  ): Observable<OMDbAPIResponseInterface | undefined> {
    console.log('page in service', title, year, page);

    return this.http.get<OMDbAPIResponseInterface | undefined>(
      `${url}&s=${title}&y=${year}&page=${page}&type=${type}`
    );
  }
}
