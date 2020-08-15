import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, SessionGuard } from '../core';

// , canActivate: [AuthGuard]
// , canActivate: [SessionGuard]
const routes: Routes = [
  {path: '', loadChildren: () => import('../layout/layout.module').then(m => m.LayoutModule)},
  {path: 'signin', loadChildren: () => import('../signin/signin.module').then(m => m.SigninModule)},
  { path: 'signup', loadChildren: () => import('../signup/signup.module').then(m => m.SignupModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
