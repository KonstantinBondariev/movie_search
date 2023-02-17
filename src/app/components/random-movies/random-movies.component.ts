import { Component, Input, OnInit } from '@angular/core';
import randomWords from 'random-words';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';

@Component({
  selector: 'app-random-movies',
  templateUrl: './random-movies.component.html',
  styleUrls: ['./random-movies.component.scss'],
})
export class RandomMoviesComponent implements OnInit {
  movies: MovieInterface[] = [];

  constructor(private mss: MovieSearchService) {}

  ngOnInit(): void {
    this.getRandomMovies('movie');
  }

  getRandomMovies(type: string) {
    if (this.movies.length == 0) {
      let randomTitlesArr = randomWords(10);
      randomTitlesArr.forEach((title) => {
        this.mss.searchMovie(title, '', 1, type).subscribe({
          next: (res) => {
            if (res) {
              this.movies.push(res?.Search[0]);
            }
          },
        });
      });
    }
  }

  clearMovies(): void {
    this.movies = [];
  }
}
