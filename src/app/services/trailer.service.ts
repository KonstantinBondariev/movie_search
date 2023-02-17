import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImdbApiYouTubeTrailerResponse } from '../shared/types/imdb-api-you-tube-trailer-response';

const url: string = 'https://imdb-api.com/API/YouTubeTrailer/k_7yrytk8j/';
@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  constructor(private http: HttpClient) {}

  getData(imdbId: string): Observable<ImdbApiYouTubeTrailerResponse> {
    return this.http.get<ImdbApiYouTubeTrailerResponse>(`${url}${imdbId}/`);
  }
}
