import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [CommentFormComponent, CommentsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
  ],
  providers: [],
  exports: [CommentFormComponent, CommentsComponent],
})
export class CommentsModule {}
