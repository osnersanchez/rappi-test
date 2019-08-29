import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreeLayoutComponent } from './layouts/free-layout/free-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: FreeLayoutComponent,
    children: [
        { path: '', loadChildren: './pages/pages.module#PagesModule' },
    ]
  },
  { path: '**', loadChildren: './pages/pages.module#PagesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }