import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentsResponse } from 'src/app/shared/types/comments-response';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() imdbID!: string | null;
  @Input() change: boolean = true;
  comments?: CommentsResponse[];

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    if (this.imdbID) this.getComments(this.imdbID);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.imdbID && changes) this.getComments(this.imdbID);
  }

  getComments(imdbID: string): void {
    this.commentsService.getComments(imdbID).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => console.log(err),
    });
  }
}
