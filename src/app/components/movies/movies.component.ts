import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, DoCheck {
  constructor(private movieSearchService: MovieSearchService) {}

  movies: MovieInterface[] | undefined = this.movieSearchService.cureantMovies;

  ngDoCheck(): void {
    if (this.movies != undefined) {
      console.log(this.movies);
    }
  }

  ngOnInit(): void {
    // this.movieSearchService.getData().subscribe({
    //   next: (res: OMDbAPIResponseInterface | undefined) => {
    //     this.movies = res?.Search;
    //   },
    // });
  }

  getData(): void {
    this.movieSearchService.getData().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
