import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { APP_BUILD_LABEL } from './app-tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterLink, RouterOutlet],
})
export class App {
  protected readonly buildLabel = inject(APP_BUILD_LABEL);
}
