import { Component, OnInit } from '@angular/core';
import { AdminCommentsService } from 'src/app/services/admin-comments.service';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentInterface } from 'src/app/shared/types/comment-interface';
import { CommentsResponse } from 'src/app/shared/types/comments-response';
import { FolderInterface } from 'src/app/shared/types/folder-interface';
import { FoldersResponseInterface } from 'src/app/shared/types/folders-response-interface';

function getAllValues(val: any): any {
  return val instanceof Object
    ? [].concat.apply(
        [],
        Object.keys(val).map(function (k) {
          return getAllValues(val[k]);
        })
      )
    : [val];
}

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.scss'],
})
export class ManageCommentsComponent implements OnInit {
  folders!: FoldersResponseInterface[];
  comments!: CommentsResponse[];
  currentImdbID!: string;
  expandedIndex = 0; //accordion
  currentTarget!: EventTarget | null;
  newStatus!: boolean;

  constructor(
    private adminCommentsService: AdminCommentsService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.getFolders();
  }

  getFolders() {
    this.adminCommentsService.getFolders().subscribe({
      next: (res) => {
        console.log(res);
        this.folders = res;
      },
      error: (err) => console.error(err),
    });
  }

  checkNewComments(folder: FoldersResponseInterface): boolean | void {
    const arr: any[] = getAllValues(folder);
    if (arr.includes(true)) return true;
  }

  getFolderData(imdbId: string) {
    this.commentsService.getComments(imdbId).subscribe({
      next: (res) => (this.comments = res.reverse()),

      error: (err) => console.error(err),
    });
  }

  onClick(folder: FoldersResponseInterface, event: Event | MouseEvent) {
    if (this.currentTarget !== event.target) {
      this.getFolderData(folder.imdbId);
      this.currentImdbID = folder.imdbId;
      this.currentTarget = event.target;
    }
    this.currentTarget = event.target;
  }

  deleteComment(folder: string, key: string) {
    if (confirm('Are you sure?')) {
      this.adminCommentsService
        .deleteComment(folder, key)
        .subscribe({ next: () => this.getFolderData(this.currentImdbID) });
    }
  }

  updateComment(folder: string, key: string, change: CommentInterface) {
    this.adminCommentsService.updateComment(folder, key, change).subscribe({
      next: () => {
        this.getFolderData(this.currentImdbID);
      },
    });
  }

  createComment(
    userName: string,
    date: Date,
    comment: string
  ): CommentInterface {
    return {
      userName,
      date,
      comment,
      newStatus: this.newStatus,
    };
  }
}
