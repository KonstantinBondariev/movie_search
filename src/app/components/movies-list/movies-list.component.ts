import { Component, Input, OnInit } from '@angular/core';
import { MovieInterface } from 'src/app/shared/types/movie-interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  @Input() movies?: MovieInterface[];

  constructor() {}

  ngOnInit(): void {}
}
