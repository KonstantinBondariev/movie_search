import { Component, OnDestroy, OnInit } from '@angular/core';
import { CureantPositionService } from 'src/app/services/current-position.service';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.scss'],
})
export class PopupWindowComponent implements OnInit {
  movie?: MovieFullDataInterface | null;

  constructor(
    private mss: MovieSearchService,
    private currentPositionService: CureantPositionService
  ) {}

  ngOnInit(): void {
    this.mss.currentID ? this.getData(this.mss.currentID) : (this.movie = null);
  }

  getData(imdbID: string): void {
    this.mss.getfullData(imdbID).subscribe({
      next: (res: MovieFullDataInterface | undefined) => {
        this.movie = res;
      },
    });
  }

  setMyStyles() {
    let styles;
    if (this.currentPositionService.posX && this.currentPositionService.posY) {
      styles = {
        left: this.currentPositionService.posX + 'px',
        top: this.currentPositionService.posY + 'px',
      };
    }
    return styles;
  }
}
