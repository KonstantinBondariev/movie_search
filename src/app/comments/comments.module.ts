import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentFormComponent, CommentsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommentFormComponent, CommentsComponent],
})
export class CommentsModule {}
