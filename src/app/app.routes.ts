import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard').then((module) => module.Dashboard),
  },
  {
    path: 'topics/:id',
    loadComponent: () =>
      import('./topic-details/topic-details').then(
        (module) => module.TopicDetails,
      ),
  },
  { path: '**', redirectTo: '' },
];
