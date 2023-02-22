import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentInterface } from 'src/app/shared/types/comment-interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  commentForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    comment: new FormControl('', Validators.required),
  });
  constructor(private commentsService: CommentsService) {}
  @Input() imdbId!: string | null;
  change: boolean = false;
  ngOnInit(): void {}

  onSubmit(): void {
    if (
      this.commentForm.valid &&
      this.commentForm.controls.userName.value &&
      this.commentForm.controls.comment.value &&
      this.imdbId
    ) {
      this.postComment(
        this.createComment(
          this.commentForm.controls.userName.value,
          this.commentForm.controls.comment.value
        ),
        this.imdbId
      );
      this.change = !this.change;
      this.commentForm.reset();
    }
  }

  createComment(userName: string, comment: string): CommentInterface {
    return {
      userName,
      date: new Date(),
      comment,
    };
  }

  postComment(comment: CommentInterface, imdbID: string): void {
    this.commentsService.createComment(comment, imdbID).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
