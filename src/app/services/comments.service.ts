import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommentInterface } from '../shared/types/comment-interface';
import { CommentsResponse } from '../shared/types/comments-response';

const url =
  'https://movie-search-a1028-default-rtdb.europe-west1.firebasedatabase.app/';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  createComment(comment: CommentInterface, imdbID: string): Observable<any> {
    return this.http.post(`${url}${imdbID}.json`, comment);
  }

  getComments(imdbID: string): Observable<CommentsResponse[]> {
    return this.http.get(`${url}${imdbID}.json`).pipe(
      map((res: any) => {
        const arr: any[] = [];
        Object.keys(res).forEach((key) => {
          arr.push({ key, ...res[key] });
        });
        return arr;
      })
    );
  }
}
