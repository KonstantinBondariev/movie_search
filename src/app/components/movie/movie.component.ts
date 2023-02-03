import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnChanges {
  @Input() cureantImdbId?: any;
  movie?: MovieFullDataInterface;
  constructor(private mss: MovieSearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mss.getfullData(id).subscribe({
        next: (res: MovieFullDataInterface | undefined) => {
          this.movie = res;
          console.log(this.movie);
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.mss.getfullData(this.cureantImdbId).subscribe({
      next: (res: MovieFullDataInterface | undefined) => {
        this.movie = res;
        console.log(this.movie);
      },
    });
  }
}
