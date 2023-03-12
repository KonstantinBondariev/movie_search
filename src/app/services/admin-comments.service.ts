import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { CommentInterface } from '../shared/types/comment-interface';
import { FolderInterface } from '../shared/types/folder-interface';
import { FoldersResponseInterface } from '../shared/types/folders-response-interface';

const urlComments =
  'https://movie-search-a1028-default-rtdb.europe-west1.firebasedatabase.app/comments/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AdminCommentsService {
  constructor(private http: HttpClient) {}

  getFolders(): Observable<FoldersResponseInterface[]> {
    return this.http.get(`${urlComments}.json`).pipe(
      map((res: any) => {
        const arr: FoldersResponseInterface[] = [];
        Object.keys(res).forEach((imdbId) => {
          arr.push({ imdbId, ...res[imdbId] });
        });
        return arr;
      })
    );
  }

  deleteComment(folder: string, key: string): Observable<any> {
    return this.http
      .delete<any>(`${urlComments}/${folder}/${key}.json`, httpOptions)
      .pipe(tap((_: any) => console.log(`deleted `)));
  }

  updateComment(folder: string, key: string, change: any): Observable<any> {
    return this.http
      .put<any>(`${urlComments}/${folder}/${key}.json`, change, httpOptions)
      .pipe(tap((_) => console.log(`updated`)));
  }
}
