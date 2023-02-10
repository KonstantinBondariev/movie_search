import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnChanges {
  @Input() currentImdbId?: string | undefined;
  movie?: MovieFullDataInterface;

  constructor(
    private mss: MovieSearchService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mss.getfullData(id).subscribe({
        next: (res: MovieFullDataInterface | undefined) => {
          this.movie = res;
          console.log(this.movie);
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currentImdbId)
      this.mss.getfullData(this.currentImdbId).subscribe({
        next: (res: MovieFullDataInterface | undefined) => {
          this.movie = res;
          console.log(this.movie);
        },
      });
  }

  goBack(): void {
    this.location.back();
  }
}
