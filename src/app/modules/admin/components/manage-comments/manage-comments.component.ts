import { Component, OnInit } from '@angular/core';
import { AdminCommentsService } from 'src/app/services/admin-comments.service';
import { CommentsService } from 'src/app/services/comments.service';
import { GetAllValuesOfNestedObjectsService } from 'src/app/services/get-all-values-of-nested-objects.service';
import { CommentInterface } from 'src/app/shared/types/comment-interface';
import { CommentsResponse } from 'src/app/shared/types/comments-response';
import { FolderInterface } from 'src/app/shared/types/folder-interface';
import { FoldersResponseInterface } from 'src/app/shared/types/folders-response-interface';

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

  constructor(
    private adminCommentsService: AdminCommentsService,
    private commentsService: CommentsService,
    private getAllValuesOfNestedObjectsService: GetAllValuesOfNestedObjectsService
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
    const arr: any[] =
      this.getAllValuesOfNestedObjectsService.getAllValues(folder);
    if (arr.includes(true)) return true;
  }

  CountNewComments(folder: FoldersResponseInterface): number | undefined {
    if (this.checkNewComments(folder)) {
      const arr: any[] =
        this.getAllValuesOfNestedObjectsService.getAllValues(folder);
      let count: number = 0;
      for (let index = 0; index < arr.length; index++) {
        if (arr[index] === true) count += 1;
      }
      return count;
    }
    return;
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
    this.adminCommentsService
      .updateComment(folder, key, change)
      .subscribe({ next: () => this.getFolderData(this.currentImdbID) });
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
      newStatus: false,
    };
  }
}
