import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';
import { debounce } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  now: number = new Date().getFullYear();

  searchForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    year: new FormControl(''),
  });

  titleControl = this.searchForm.controls.title;
  yearControl = this.searchForm.controls.year;

  movieTitle!: string;
  movieYear!: string;
  movies?: MovieInterface[]; // nujen??
  currentPage: number = this.movieSearchService.curreantPage;
  flag: boolean = false;
  yearsArr: string[] = [];

  constructor(
    private movieSearchService: MovieSearchService,
    private route: ActivatedRoute
  ) {
    this.movieSearch = debounce(this.movieSearch, 100);
  }

  ngOnInit(): void {
    this.setYearsArr();
  }

  onSubmit() {
    this.movieTitle = this.titleControl.value || '';
    this.movieYear = this.yearControl.value || '';
    console.log(this.movieTitle);

    this.movieSearch(this.movieTitle, this.movieYear);
  }

  movieSearch(title: string, year: string): void {
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

  setYearsArr() {
    for (let year = 1900; year <= this.now; year++) {
      this.yearsArr.push(`${year}`);
    }
    this.yearsArr.reverse();
  }
}
