import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CureantPositionService } from 'src/app/services/cureant-position.service';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieInterface } from 'src/app/shared/types/movie-interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  @Input() movies: MovieInterface[] | undefined;
  cureantImdbID?: string;
  onHover: boolean = false;
  do?: any;
  onHoverId?: string;

  constructor(
    private mss: MovieSearchService,
    private dialog: MatDialog,
    private cureantPositionService: CureantPositionService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }

  // leave() {
  //   clearTimeout(this.do);
  //   this.onHover = false;
  // }

  leave() {
    setTimeout(() => {
      clearTimeout(this.do);
      this.onHover = false;
    }, 500);
  }

  enter(event: MouseEvent) {
    this.do = setTimeout(() => {
      this.onHover = true;
      if (event) {
        const img: any = event.target;
        this.cureantPositionService.posX = event.pageX;
        this.cureantPositionService.posY = event.pageY;
        img ? (this.mss.cureantID = img.alt) : null;
      }
    }, 1500);
  }

  // enter(target: any) {
  //   this.do = setTimeout(() => {
  //     this.onHover = true;
  //     if (target) this.mss.cureantID = target.alt;

  //     // this.openDialog();
  //   }, 1500);
  // }
}
