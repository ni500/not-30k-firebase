import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VakiViewComponent } from './vaki-view/vaki-view.component';

const routes: Routes = [
  {
    path: 'vaki/:vakiKey',
    component: VakiViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
