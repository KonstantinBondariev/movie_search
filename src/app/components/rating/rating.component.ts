import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() imdbRating!: string | undefined;
  imdbNumRating?: number;

  constructor() {}

  ngOnInit(): void {
    console.log('rating', this.imdbRating, this.imdbNumRating);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.imdbRating) this.imdbNumRating = Math.round(+this.imdbRating);
  }
}
