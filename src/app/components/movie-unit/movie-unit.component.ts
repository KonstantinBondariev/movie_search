import { Component, Input, OnInit } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';
import { MovieInterface } from 'src/app/shared/types/movie-interface';

@Component({
  selector: 'app-movie-unit',
  templateUrl: './movie-unit.component.html',
  styleUrls: ['./movie-unit.component.scss'],
})
export class MovieUnitComponent implements OnInit {
  @Input() movie!: MovieInterface;
  movieFullInfo?: MovieFullDataInterface;
  onHover: boolean = false;
  do?: NodeJS.Timeout;
  onHoverId?: string;

  constructor(private mss: MovieSearchService) {}

  ngOnInit(): void {}

  getFullData(imdbID: string): void {
    this.mss.getfullData(imdbID).subscribe({
      next: (res) => {
        this.movieFullInfo = res;
      },
      error: (err) => console.error(err),
    });
  }

  setStyle() {
    let styles;
    if (this.onHover) {
      styles = {
        display: 'flex',
        transition: 'all 1s',
      };
    }
    return styles;
  }

  enter(event: MouseEvent | Event) {
    this.do = setTimeout(() => {
      this.onHover = true;
      if (event.target) {
        const target: any = event.target;
        const id: string = target.id;
        this.getFullData(id);
      }
    }, 1000);
  }
  leave() {
    clearTimeout(this.do);
    this.onHover = false;
  }
}
