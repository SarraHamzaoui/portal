import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AngularPortal';
  constructor(private platform: Platform) { }

  ngOnInit() {
    // if (this.platform.isBrowser) {
    //   // Utiliser localStorage uniquement si c'est côté client
    //   localStorage.clear();
    // }
  }
}
