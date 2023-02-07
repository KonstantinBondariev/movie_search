import { Component, OnInit } from '@angular/core';
import randomWords from 'random-words';
import { map } from 'rxjs';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { OMDbAPIResponseInterface } from 'src/app/shared/types/omdb-api-response-interface';

@Component({
  selector: 'app-random-movies',
  templateUrl: './random-movies.component.html',
  styleUrls: ['./random-movies.component.scss'],
})
export class RandomMoviesComponent implements OnInit {
  randomMovies: MovieInterface[] = [];

  constructor(private mss: MovieSearchService) {}

  ngOnInit(): void {
    this.getRandomMovies();
  }

  getRandomMovies() {
    this.randomMovies = [];
    let randomTitlesArr = randomWords(10);
    randomTitlesArr.forEach(async (title) => {
      this.mss.searchMovie(title, '').subscribe({
        next: (res) => {
          if (res) {
            this.randomMovies.push(res?.Search[0]);
          }
        },
      });
    });
  }
}
