import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, SessionGuard } from '../core';


const routes: Routes = [
  {path: '', loadChildren: () => import('../layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard]},
  {path: 'signin', loadChildren: () => import('../signin/signin.module').then(m => m.SigninModule), canActivate: [SessionGuard]},
  { path: 'signup', loadChildren: () => import('../signup/signup.module').then(m => m.SignupModule), canActivate: [ SessionGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
