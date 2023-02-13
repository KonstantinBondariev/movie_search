import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CureantPositionService } from 'src/app/services/current-position.service';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { debounce } from 'lodash';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnChanges {
  @Input() movies: MovieInterface[] | undefined;
  cureantImdbID?: string;
  onHover: boolean = false;
  do?: any;
  onHoverId?: string;

  constructor(
    private mss: MovieSearchService,
    private currentPositionService: CureantPositionService
  ) {
    this.setPosition = debounce(this.setPosition, 50);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  leave() {
    // setTimeout(() => {
    clearTimeout(this.do);
    this.onHover = false;
    this.mss.currentID = null;
    // }, 100);
  }

  setPosition(event: MouseEvent): void {
    this.currentPositionService.posY = event.pageY;

    if (event.pageX <= (2 * window.outerWidth) / 3) {
      this.currentPositionService.posX = event.pageX + 50;
    } else {
      this.currentPositionService.posX =
        event.pageX - 50 - window.outerWidth / 3;
    }
  }

  enter(event: MouseEvent) {
    this.do = setTimeout(() => {
      this.onHover = true;
      if (event) {
        const img: any = event.target;

        img ? (this.mss.currentID = img.alt) : null;
      }
    }, 1000);
  }
}
