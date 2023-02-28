import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';
import { TrailerService } from 'src/app/services/trailer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImdbApiYouTubeTrailerResponse } from 'src/app/shared/types/imdb-api-you-tube-trailer-response';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie?: MovieFullDataInterface;
  trailerData?: ImdbApiYouTubeTrailerResponse;
  urlSafe?: SafeResourceUrl;
  imdbId!: string | null;

  constructor(
    private mss: MovieSearchService,
    private route: ActivatedRoute,
    private location: Location,
    private trailer: TrailerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.imdbId = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getMovieData(id);
      this.getTrailerData(id);
    }
  }

  getMovieData(id: string): void {
    this.mss.getfullData(id).subscribe({
      next: (res: MovieFullDataInterface | undefined) => {
        this.movie = res;
      },
    });
  }

  getTrailerData(id: string): void {
    this.trailer.getData(id).subscribe({
      next: (res) => {
        this.trailerData = res;
        this.createUrlForIframe();
      },
    });
  }

  createUrlForIframe(): void {
    const url = `https://www.youtube.com/embed/${this.trailerData?.videoId}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack(): void {
    this.location.back();
  }
}
