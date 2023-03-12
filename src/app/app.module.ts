import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

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
import { FooterComponent } from './components/footer/footer.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieUnitComponent } from './components/movie-unit/movie-unit.component';
import { MenuComponent } from './components/menu/menu.component';
import { CommentsModule } from './modules/comments/comments.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

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
    FooterComponent,
    MoviesListComponent,
    MovieUnitComponent,
    MenuComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    CommentsModule,
    AdminModule,
    BrowserAnimationsModule,
  ],
})
export class AppModule {}
