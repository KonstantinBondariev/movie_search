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
  @Input() movies: any;
  constructor(
    private route: ActivatedRoute,
    private movieSearchService: MovieSearchService
  ) {
    route.params.subscribe((id) => {
      if (id && this.movieSearchService.currentTitle)
        this.movieSearch(
          this.movieSearchService.currentTitle,
          this.movieSearchService.currentYear
        );
    });
  }

  ngOnInit(): void {}

  movieSearch(title: string, year: string): void {
    this.movieSearchService.currentTitle = title;
    this.movieSearchService.currentYear = year;
    this.movieSearchService.searchMovie(title, year).subscribe({
      next: (res: OMDbAPIResponseInterface | undefined) => {
        console.log(res);

        this.movies = res?.Search;
        this.movieSearchService.totalResult = res?.totalResults;
      },
    });
  }
}
