import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCommentsComponent } from './components/manage-comments/manage-comments.component';
import { AuthGuard } from 'src/app/services/guard/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'comments', component: ManageCommentsComponent },
      // { path: 'users', component: ManageUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
