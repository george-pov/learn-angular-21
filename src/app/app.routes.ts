import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.Dashboard),
    title: 'Angular 21 Learning Tracker',
  },
  {
    path: 'topics/:id',
    loadComponent: () =>
      import('./topic-details/topic-details').then(
        (m) => m.TopicDetails,
      ),
    title: 
  },
  {
    path: '**',
    redirectTo: '',
  },];
