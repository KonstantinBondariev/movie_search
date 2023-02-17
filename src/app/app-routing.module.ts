import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './components/movie/movie.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './components/page/page.component';
import { RandomMoviesComponent } from './components/random-movies/random-movies.component';
import { RandomSeriesComponent } from './components/random-series/random-series.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    children: [
      {
        path: '',
        component: PageComponent,
        // outlet: 'movies',
      },
      {
        path: 'page/:id',
        component: PageComponent,
      },
    ],
  },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'random-movies', component: RandomMoviesComponent },
  { path: 'random-series', component: RandomSeriesComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
