import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SearchComponent } from './components/search/search.component';
import { MovieComponent } from './components/movie/movie.component';
import { PopupWindowComponent } from './components/popup-window/popup-window.component';
import { RandomMoviesComponent } from './components/random-movies/random-movies.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PageComponent } from './components/page/page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RandomSeriesComponent } from './components/random-series/random-series.component';
import { RatingComponent } from './components/rating/rating.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchComponent,
    MovieComponent,
    PopupWindowComponent,
    RandomMoviesComponent,
    PaginatorComponent,
    PageComponent,
    NavigationComponent,
    RandomSeriesComponent,
    RatingComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
