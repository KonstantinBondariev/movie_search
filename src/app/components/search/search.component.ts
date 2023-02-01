import { Component, OnInit, Input } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  movieTitle: string = '';
  movieYear: string = '';
  @Input() movies?: MovieInterface[];

  constructor(private movieSearchService: MovieSearchService) {}

  ngOnInit(): void {}

  movieSearch(title: string, year: string): void {
    this.movieSearchService.searchMovie(title, year).subscribe({
      next: (res: OMDbAPIResponseInterface | undefined) => {
        this.movies = res?.Search;
      },
    });
  }
}
