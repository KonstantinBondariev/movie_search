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
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500),
    ]),
    recaptchaReactive: new FormControl('', [Validators.required]),
  });

  siteKey: string = '6LcCM6skAAAAAE8jynUPmsmeyWVefZ5AxhLXocny';

  comment = this.commentForm.controls.comment;
  userName = this.commentForm.controls.userName;

  constructor(private commentsService: CommentsService) {}

  @Input() imdbId!: string | null;
  change: boolean = false; // to refresh comments.component
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
        this.change = !this.change;
      },
    });
  }
}
