import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';
import { debounce } from 'lodash';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  movieTitle: string = '';
  movieYear: string = '';
  movies?: MovieInterface[]; // nujen??
  currentPage: number = this.movieSearchService.curreantPage;
  flag: boolean = false;

  constructor(
    private movieSearchService: MovieSearchService,
    private route: ActivatedRoute
  ) {
    this.movieSearch = debounce(this.movieSearch, 100);
  }

  ngOnInit(): void {}

  movieSearch(title: string, year: string): void {
    if (title.length < 3) return;
    this.movieSearchService.currentTitle = title;
    this.movieSearchService.currentYear = year;
    this.movieSearchService.curreantPage = 1;
    this.movieSearchService.searchMovie(title, year).subscribe({
      next: (res: OMDbAPIResponseInterface | undefined) => {
        this.movies = res?.Search;
        this.movieSearchService.totalResult = res?.totalResults;
        this.movieSearchService.currentMovies = res?.Search;
        this.flag = !this.flag;
      },
      error: (err) => console.error(err),
    });
  }
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') this.movieSearch(this.movieTitle, this.movieYear);
  }
}
