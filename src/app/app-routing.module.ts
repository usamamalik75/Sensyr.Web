import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/app/sensor', pathMatch: 'full' },
  {
    path: 'app',
    loadChildren: () => import('@app/nav/nav.module').then(m => m.NavModule),
    data: {
      preload: true,
      delay: false
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
