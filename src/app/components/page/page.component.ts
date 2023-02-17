import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  movies: any;
  constructor(
    private route: ActivatedRoute,
    private movieSearchService: MovieSearchService
  ) {
    route.params.subscribe((params) => {
      if (params['id'] && this.movieSearchService.currentTitle) {
        console.log('000', params['id']);
        this.movieSearch(
          this.movieSearchService.currentTitle,
          this.movieSearchService.currentYear
        );
      } else {
        // nujen?
        this.movies = this.movieSearchService.currentMovies;
        console.log('@@@@');
      }
    });
  }

  ngOnInit(): void {}

  movieSearch(title: string, year: string): void {
    this.movieSearchService.currentTitle = title;
    this.movieSearchService.currentYear = year;
    this.movieSearchService.searchMovie(title, year).subscribe({
      next: (res: OMDbAPIResponseInterface | undefined) => {
        console.log(
          'title:',
          this.movieSearchService.currentTitle,
          'page:',
          this.movieSearchService.curreantPage,
          'first movie',
          res?.Search[0].imdbID
        );

        this.movies = res?.Search;
        this.movieSearchService.totalResult = res?.totalResults;
      },
    });
  }
}
