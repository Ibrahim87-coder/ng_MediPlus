import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },{path:"",component:HomePageComponent},{path:"list",component:ListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
