import { Component, Input, OnInit } from '@angular/core';
import randomWords from 'random-words';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';

@Component({
  selector: 'app-random-series',
  templateUrl: './random-series.component.html',
  styleUrls: ['./random-series.component.scss'],
})
export class RandomSeriesComponent implements OnInit {
  series: MovieInterface[] = [];

  constructor(private mss: MovieSearchService) {}

  ngOnInit(): void {
    this.getRandomMovies('series');
  }

  getRandomMovies(type: string) {
    if (this.series.length == 0) {
      let randomTitlesArr = randomWords(10);
      randomTitlesArr.forEach((title) => {
        this.mss.searchMovie(title, '', 1, type).subscribe({
          next: (res) => {
            if (res) {
              this.series.push(res?.Search[0]);
            }
          },
        });
      });
    }
  }

  clearMovies(): void {
    this.series = [];
  }
}
