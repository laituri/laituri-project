import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideViewModule } from './views/guide-view/guide-view.module';
import { UserProfileFields } from './examples/user-profile';
import { RecipeFields } from './examples/recipe';
import { CaptionThisFields } from './examples/caption-this';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./views/guide-view/guide-view.module').then(
        (m) => m.GuideViewModule,
      ),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./views/example-view/example-view.module').then(
        (m) => m.ExampleViewModule,
      ),
    data: RecipeFields,
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./views/example-view/example-view.module').then(
        (m) => m.ExampleViewModule,
      ),
    data: UserProfileFields,
  },
  {
    path: 'caption-this',
    loadChildren: () =>
      import('./views/example-view/example-view.module').then(
        (m) => m.ExampleViewModule,
      ),
    data: CaptionThisFields,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), GuideViewModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
