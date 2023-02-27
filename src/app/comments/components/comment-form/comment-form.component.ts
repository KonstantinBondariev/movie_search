import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
  });

  token: string | undefined;

  constructor(private commentsService: CommentsService) {
    this.token = undefined;
  }

  @Input() imdbId!: string | null;
  change: boolean = false; // &&&&&&&&&&&&
  ngOnInit(): void {}

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

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
