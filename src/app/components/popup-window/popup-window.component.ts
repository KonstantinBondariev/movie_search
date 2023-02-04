import { Component, OnInit } from '@angular/core';
import { CureantPositionService } from 'src/app/services/cureant-position.service';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.scss'],
})
export class PopupWindowComponent implements OnInit {
  movie?: MovieFullDataInterface;

  constructor(
    private mss: MovieSearchService,
    private cureantPositionService: CureantPositionService
  ) {}

  ngOnInit(): void {
    if (this.mss.cureantID) {
      this.mss.getfullData(this.mss.cureantID).subscribe({
        next: (res: MovieFullDataInterface | undefined) => {
          this.movie = res;
          console.log(this.movie);
        },
      });
    }
  }

  setMyStyles() {
    let styles;
    if (this.cureantPositionService.posX && this.cureantPositionService.posY) {
      styles = {
        left: this.cureantPositionService.posX + 'px',
        top: this.cureantPositionService.posY + 'px',
      };
    }

    return styles;
  }
}
