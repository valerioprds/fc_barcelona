import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { ErrorComponent } from './shared/error/error.component';
import { MixinComponent } from './components/mixin/mixin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'player/:id', component: PlayerDetailsComponent },
  { path: 'error', component: ErrorComponent },
  {path: 'mixin', component: MixinComponent},
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
  // Other routes...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
