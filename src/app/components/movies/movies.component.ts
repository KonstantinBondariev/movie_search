import { Component, OnInit, Input } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  constructor(private mss: MovieSearchService) {}

  @Input() movies: MovieInterface[] | undefined;

  ngOnInit(): void {
    this.mss.getData().subscribe({
      next: (res: OMDbAPIResponseInterface | undefined) => {
        this.movies = res?.Search;
      },
    });
  }
}
