import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './components/movie/movie.component';
import { PageComponent } from './components/page/page.component';
import { RandomMoviesComponent } from './components/random-movies/random-movies.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'random', component: RandomMoviesComponent },
  { path: 'page/:id', component: PageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
