import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'player/:id', component: PlayerDetailsComponent },
  // Other routes...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
