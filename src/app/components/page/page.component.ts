import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  movies?: MovieInterface[];
  constructor(
    private route: ActivatedRoute,
    private movieSearchService: MovieSearchService
  ) {
    route.params.subscribe((params) => {
      if (params['id'] && this.movieSearchService.currentTitle) {
        this.getData(
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

  setCurrentPropertiesInMovieSearchService(title: string, year: string): void {
    this.movieSearchService.currentTitle = title;
    this.movieSearchService.currentYear = year;
  }

  getData(title: string, year: string): void {
    this.setCurrentPropertiesInMovieSearchService(title, year);
    this.movieSearchService.searchMovie(title, year).subscribe({
      next: (res: OMDbAPIResponseInterface | undefined) => {
        this.movies = res?.Search;
        this.movieSearchService.totalResult = res?.totalResults;
      },
    });
  }
}
