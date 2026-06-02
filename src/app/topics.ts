import { Topic } from './topic';

export const INITIAL_TOPICS: Topic[] = [
  {
      id: 1,
      title: 'Standalone components',
      description: 'Build components without NgModules as the default app structure.',
      done: true,
    },
    {
      id: 2,
      title: 'Signals',
      description: 'Use explicit reactive state for local UI behavior.',
      done: false,
    },
    {
      id: 3,
      title: 'New template control flow',
      description: 'Render lists and conditions with @for and @if.',
      done: false,
    },
    {
      id: 4,
      title: 'Deferrable views',
      description: 'Enjoy faster builds and smaller bundles with the new build system.',
      done: false,
    }
];